// routes/requests.routes.ts - Request management routes with resolution functionality
import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { RequestController } from '../controllers/request.controller';
import { authMiddleware, adminMiddleware } from '../middleware/auth.middleware';

const router = Router();
const requestController = new RequestController();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/resolutions/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'resolution-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 5 // Maximum 5 files
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Request CRUD operations
router.get('/', requestController.getAllRequests);
router.get('/:id', requestController.getRequestById);
router.post('/', requestController.createRequest);
router.put('/:id', adminMiddleware, requestController.updateRequest);
router.delete('/:id', adminMiddleware, requestController.deleteRequest);

// Status management
router.patch('/:id/status', requestController.updateRequestStatus);

// Assignment management
router.post('/:id/assign', adminMiddleware, requestController.assignTechnician);

// Resolution management with image upload
router.post('/:id/resolution', upload.array('images', 5), requestController.createResolution);
router.get('/:id/resolution', requestController.getResolution);
router.put('/resolutions/:id', upload.array('images', 5), requestController.updateResolution);
router.delete('/resolutions/:id/images/:imageId', requestController.deleteResolutionImage);
router.get('/resolutions/:id/images', requestController.getResolutionImages);

// Comments
router.post('/:id/comments', requestController.addComment);
router.get('/:id/comments', requestController.getComments);

// History
router.get('/:id/history', requestController.getRequestHistory);

// Bulk operations (admin only)
router.post('/bulk-update', adminMiddleware, requestController.bulkUpdateRequests);

export default router;