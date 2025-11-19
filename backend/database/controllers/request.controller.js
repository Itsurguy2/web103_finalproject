// controllers/request.controller.ts - Request controller with resolution functionality
import { Request, Response, NextFunction } from 'express';
import { pool } from '../config/database';
import { sendEmail } from '../utils/email';
import fs from 'fs/promises';
import path from 'path';

export class RequestController {
  // Get all requests with filters
  async getAllRequests(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        status,
        category,
        urgency,
        limit = 10,
        offset = 0,
        dateFrom,
        dateTo
      } = req.query;

      let query = `
        SELECT 
          r.*,
          u.name as submitted_by_name,
          u.email as submitted_by_email,
          t.name as assigned_to_name
        FROM requests r
        LEFT JOIN users u ON r.submitted_by = u.id
        LEFT JOIN users t ON r.assigned_to = t.id
        WHERE 1=1
      `;
      const params: any[] = [];

      if (status && status !== 'all') {
        query += ` AND r.status = $${params.length + 1}`;
        params.push(status);
      }

      if (category && category !== 'all') {
        query += ` AND r.category = $${params.length + 1}`;
        params.push(category);
      }

      if (urgency && urgency !== 'all') {
        query += ` AND r.urgency = $${params.length + 1}`;
        params.push(urgency);
      }

      if (dateFrom) {
        query += ` AND r.created_at >= $${params.length + 1}`;
        params.push(dateFrom);
      }

      if (dateTo) {
        query += ` AND r.created_at <= $${params.length + 1}`;
        params.push(dateTo);
      }

      query += ` ORDER BY r.created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
      params.push(limit, offset);

      const result = await pool.query(query, params);

      res.json({
        data: result.rows,
        total: result.rowCount,
        limit,
        offset
      });
    } catch (error) {
      next(error);
    }
  }

  // Get request by ID
  async getRequestById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const result = await pool.query(`
        SELECT 
          r.*,
          u.name as submitted_by_name,
          u.email as submitted_by_email,
          t.name as assigned_to_name
        FROM requests r
        LEFT JOIN users u ON r.submitted_by = u.id
        LEFT JOIN users t ON r.assigned_to = t.id
        WHERE r.id = $1
      `, [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Request not found' });
      }

      res.json({ data: result.rows[0] });
    } catch (error) {
      next(error);
    }
  }

  // Create new request
  async createRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        title,
        description,
        category,
        location,
        urgency,
        image_url
      } = req.body;

      const userId = (req as any).user.id; // From auth middleware

      const result = await pool.query(`
        INSERT INTO requests (
          title, description, category, location, urgency, 
          status, submitted_by, image_url, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, 'pending', $6, $7, NOW(), NOW())
        RETURNING *
      `, [title, description, category, location, urgency, userId, image_url]);

      res.status(201).json({
        message: 'Request created successfully',
        data: result.rows[0]
      });
    } catch (error) {
      next(error);
    }
  }

  // Update request
  async updateRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const updateFields = Object.keys(updates)
        .filter(key => key !== 'id')
        .map((key, index) => `${key} = $${index + 2}`)
        .join(', ');

      const values = Object.values(updates);

      const result = await pool.query(`
        UPDATE requests 
        SET ${updateFields}, updated_at = NOW()
        WHERE id = $1
        RETURNING *
      `, [id, ...values]);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Request not found' });
      }

      res.json({
        message: 'Request updated successfully',
        data: result.rows[0]
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete request
  async deleteRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const result = await pool.query(
        'DELETE FROM requests WHERE id = $1 RETURNING *',
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Request not found' });
      }

      res.json({ message: 'Request deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  // Update request status
  async updateRequestStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const result = await pool.query(`
        UPDATE requests 
        SET status = $2, updated_at = NOW()
        WHERE id = $1
        RETURNING *
      `, [id, status]);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Request not found' });
      }

      res.json({
        message: 'Status updated successfully',
        data: result.rows[0]
      });
    } catch (error) {
      next(error);
    }
  }

  // Assign technician
  async assignTechnician(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { technicianId } = req.body;

      const result = await pool.query(`
        UPDATE requests 
        SET assigned_to = $2, status = 'in-progress', updated_at = NOW()
        WHERE id = $1
        RETURNING *
      `, [id, technicianId]);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Request not found' });
      }

      res.json({
        message: 'Technician assigned successfully',
        data: result.rows[0]
      });
    } catch (error) {
      next(error);
    }
  }

  // Create resolution with images
  async createResolution(req: Request, res: Response, next: NextFunction) {
    const client = await pool.connect();
    try {
      const { id } = req.params;
      const {
        notes,
        sendNotification,
        markRecurring,
        schedulePreventive
      } = req.body;
      
      const files = req.files as Express.Multer.File[];
      const resolvedBy = (req as any).user.id;

      await client.query('BEGIN');

      // Create resolution record
      const resolutionResult = await client.query(`
        INSERT INTO resolutions (
          request_id, resolved_by, resolution_notes, resolved_at,
          mark_recurring, schedule_preventive
        ) VALUES ($1, $2, $3, NOW(), $4, $5)
        RETURNING *
      `, [id, resolvedBy, notes, markRecurring === 'true', schedulePreventive === 'true']);

      const resolutionId = resolutionResult.rows[0].id;

      // Save image references if uploaded
      if (files && files.length > 0) {
        for (const file of files) {
          await client.query(`
            INSERT INTO resolution_images (
              resolution_id, image_url, filename, size, uploaded_at
            ) VALUES ($1, $2, $3, $4, NOW())
          `, [resolutionId, `/uploads/resolutions/${file.filename}`, file.originalname, file.size]);
        }
      }

      // Update request status to resolved
      await client.query(`
        UPDATE requests 
        SET status = 'resolved', resolved_at = NOW(), updated_at = NOW()
        WHERE id = $1
      `, [id]);

      // Get request details for notification
      if (sendNotification === 'true') {
        const requestResult = await client.query(`
          SELECT r.*, u.email, u.name
          FROM requests r
          JOIN users u ON r.submitted_by = u.id
          WHERE r.id = $1
        `, [id]);

        if (requestResult.rows.length > 0) {
          const request = requestResult.rows[0];
          // Send email notification
          await sendEmail({
            to: request.email,
            subject: `Your maintenance request has been resolved - ${request.title}`,
            html: `
              <h2>Request Resolved</h2>
              <p>Dear ${request.name},</p>
              <p>Your maintenance request "${request.title}" has been resolved.</p>
              <h3>Resolution Notes:</h3>
              <p>${notes}</p>
              <p>Thank you for using ServiceLink!</p>
            `
          });
        }
      }

      await client.query('COMMIT');

      res.json({
        message: 'Request resolved successfully',
        data: {
          resolution: resolutionResult.rows[0],
          imagesUploaded: files ? files.length : 0
        }
      });
    } catch (error) {
      await client.query('ROLLBACK');
      
      // Clean up uploaded files if there was an error
      if (req.files) {
        const files = req.files as Express.Multer.File[];
        for (const file of files) {
          try {
            await fs.unlink(file.path);
          } catch (unlinkError) {
            console.error('Error deleting file:', unlinkError);
          }
        }
      }
      
      next(error);
    } finally {
      client.release();
    }
  }

  // Get resolution for a request
  async getResolution(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const result = await pool.query(`
        SELECT 
          r.*,
          u.name as resolved_by_name,
          array_agg(
            json_build_object(
              'id', ri.id,
              'url', ri.image_url,
              'filename', ri.filename,
              'size', ri.size
            )
          ) FILTER (WHERE ri.id IS NOT NULL) as images
        FROM resolutions r
        LEFT JOIN users u ON r.resolved_by = u.id
        LEFT JOIN resolution_images ri ON r.id = ri.resolution_id
        WHERE r.request_id = $1
        GROUP BY r.id, u.name
      `, [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Resolution not found' });
      }

      res.json({ data: result.rows[0] });
    } catch (error) {
      next(error);
    }
  }

  // Update resolution
  async updateResolution(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { notes } = req.body;
      const files = req.files as Express.Multer.File[];

      // Update resolution notes
      await pool.query(`
        UPDATE resolutions 
        SET resolution_notes = $2, updated_at = NOW()
        WHERE id = $1
      `, [id, notes]);

      // Add new images if uploaded
      if (files && files.length > 0) {
        for (const file of files) {
          await pool.query(`
            INSERT INTO resolution_images (
              resolution_id, image_url, filename, size, uploaded_at
            ) VALUES ($1, $2, $3, $4, NOW())
          `, [id, `/uploads/resolutions/${file.filename}`, file.originalname, file.size]);
        }
      }

      res.json({ message: 'Resolution updated successfully' });
    } catch (error) {
      next(error);
    }
  }

  // Delete resolution image
  async deleteResolutionImage(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, imageId } = req.params;

      // Get image info
      const imageResult = await pool.query(
        'SELECT * FROM resolution_images WHERE id = $1 AND resolution_id = $2',
        [imageId, id]
      );

      if (imageResult.rows.length === 0) {
        return res.status(404).json({ message: 'Image not found' });
      }

      const image = imageResult.rows[0];

      // Delete from database
      await pool.query(
        'DELETE FROM resolution_images WHERE id = $1',
        [imageId]
      );

      // Delete physical file
      const filePath = path.join(__dirname, '../../', image.image_url);
      try {
        await fs.unlink(filePath);
      } catch (error) {
        console.error('Error deleting file:', error);
      }

      res.json({ message: 'Image deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  // Get resolution images
  async getResolutionImages(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const result = await pool.query(
        'SELECT * FROM resolution_images WHERE resolution_id = $1 ORDER BY uploaded_at DESC',
        [id]
      );

      res.json({ data: result.rows });
    } catch (error) {
      next(error);
    }
  }

  // Add comment
  async addComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { comment } = req.body;
      const userId = (req as any).user.id;

      const result = await pool.query(`
        INSERT INTO request_comments (request_id, user_id, comment, created_at)
        VALUES ($1, $2, $3, NOW())
        RETURNING *
      `, [id, userId, comment]);

      res.status(201).json({
        message: 'Comment added successfully',
        data: result.rows[0]
      });
    } catch (error) {
      next(error);
    }
  }

  // Get comments
  async getComments(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const result = await pool.query(`
        SELECT c.*, u.name as user_name
        FROM request_comments c
        JOIN users u ON c.user_id = u.id
        WHERE c.request_id = $1
        ORDER BY c.created_at DESC
      `, [id]);

      res.json({ data: result.rows });
    } catch (error) {
      next(error);
    }
  }

  // Get request history
  async getRequestHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const result = await pool.query(`
        SELECT * FROM request_history
        WHERE request_id = $1
        ORDER BY created_at DESC
      `, [id]);

      res.json({ data: result.rows });
    } catch (error) {
      next(error);
    }
  }

  // Bulk update requests
  async bulkUpdateRequests(req: Request, res: Response, next: NextFunction) {
    try {
      const { ids, updates } = req.body;

      const updateFields = Object.keys(updates)
        .map((key, index) => `${key} = $${index + 2}`)
        .join(', ');

      const values = Object.values(updates);

      const result = await pool.query(`
        UPDATE requests 
        SET ${updateFields}, updated_at = NOW()
        WHERE id = ANY($1::int[])
        RETURNING *
      `, [ids, ...values]);

      res.json({
        message: `${result.rowCount} requests updated successfully`,
        data: result.rows
      });
    } catch (error) {
      next(error);
    }
  }
}