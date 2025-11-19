-- ServiceLink Database Schema
-- PostgreSQL Database Setup

-- Create database
CREATE DATABASE servicelink;
\c servicelink;

-- Enable UUID extension for unique IDs (optional)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(50) NOT NULL CHECK (role IN ('student', 'staff', 'faculty', 'technician', 'admin')),
    department VARCHAR(255),
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Requests table
CREATE TABLE requests (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    urgency VARCHAR(50) NOT NULL CHECK (urgency IN ('low', 'medium', 'high', 'critical')),
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'resolved', 'cancelled')),
    submitted_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    assigned_to INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP,
    resolved_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    estimated_time DECIMAL(5,2),
    CONSTRAINT check_resolved_consistency CHECK (
        (status = 'resolved' AND resolved_at IS NOT NULL AND resolved_by IS NOT NULL) OR
        (status != 'resolved' AND resolved_at IS NULL AND resolved_by IS NULL)
    )
);

-- Resolutions table
CREATE TABLE resolutions (
    id SERIAL PRIMARY KEY,
    request_id INTEGER UNIQUE REFERENCES requests(id) ON DELETE CASCADE,
    resolved_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    notes TEXT NOT NULL,
    resolved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    send_notification BOOLEAN DEFAULT TRUE,
    mark_recurring BOOLEAN DEFAULT FALSE,
    schedule_preventive BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Resolution Images table
CREATE TABLE resolution_images (
    id SERIAL PRIMARY KEY,
    resolution_id INTEGER REFERENCES resolutions(id) ON DELETE CASCADE,
    image_path VARCHAR(500) NOT NULL,
    filename VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Request Images table (for initial request submissions)
CREATE TABLE request_images (
    id SERIAL PRIMARY KEY,
    request_id INTEGER REFERENCES requests(id) ON DELETE CASCADE,
    image_path VARCHAR(500) NOT NULL,
    filename VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Technicians table
CREATE TABLE technicians (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    skills TEXT[], -- Array of skills
    current_workload INTEGER DEFAULT 0,
    max_capacity INTEGER DEFAULT 10,
    availability VARCHAR(50) DEFAULT 'available' CHECK (availability IN ('available', 'busy', 'offline')),
    location VARCHAR(255),
    rating DECIMAL(3,2) DEFAULT 0.00,
    specialization VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    color VARCHAR(7), -- Hex color code
    icon VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Locations table
CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    building VARCHAR(255) NOT NULL,
    floor VARCHAR(50),
    room VARCHAR(100),
    zone VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(building, floor, room)
);

-- Comments table (for request discussions)
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    request_id INTEGER REFERENCES requests(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Auto Assignment Rules table
CREATE TABLE auto_assignment_rules (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    condition_category VARCHAR(100),
    condition_urgency VARCHAR(50),
    condition_location VARCHAR(255),
    condition_keywords TEXT[],
    action_assign_to INTEGER REFERENCES users(id) ON DELETE SET NULL,
    action_priority INTEGER,
    action_tags TEXT[],
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications table
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    related_request_id INTEGER REFERENCES requests(id) ON DELETE CASCADE,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Activity Log table
CREATE TABLE activity_log (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id INTEGER,
    details JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- System Settings table
CREATE TABLE system_settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(255) UNIQUE NOT NULL,
    value TEXT,
    type VARCHAR(50) DEFAULT 'string',
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Feedback/Ratings table
CREATE TABLE feedback (
    id SERIAL PRIMARY KEY,
    request_id INTEGER REFERENCES requests(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_requests_status ON requests(status);
CREATE INDEX idx_requests_submitted_by ON requests(submitted_by);
CREATE INDEX idx_requests_assigned_to ON requests(assigned_to);
CREATE INDEX idx_requests_created_at ON requests(created_at DESC);
CREATE INDEX idx_requests_category ON requests(category);
CREATE INDEX idx_requests_urgency ON requests(urgency);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_resolutions_request_id ON resolutions(request_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id, is_read);
CREATE INDEX idx_activity_log_user_id ON activity_log(user_id, created_at DESC);

-- Create triggers to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_requests_updated_at BEFORE UPDATE ON requests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default categories
INSERT INTO categories (name, description, color, icon) VALUES
    ('IT', 'Information Technology issues', '#3B82F6', 'computer'),
    ('HVAC', 'Heating, Ventilation, and Air Conditioning', '#EF4444', 'thermometer'),
    ('Plumbing', 'Water and drainage systems', '#06B6D4', 'droplet'),
    ('Electrical', 'Electrical systems and lighting', '#F59E0B', 'zap'),
    ('General', 'General maintenance and repairs', '#6B7280', 'wrench'),
    ('Cleaning', 'Cleaning and sanitation', '#10B981', 'sparkles'),
    ('Security', 'Security and access control', '#8B5CF6', 'shield'),
    ('Grounds', 'Outdoor and landscaping', '#84CC16', 'tree');

-- Insert default system settings
INSERT INTO system_settings (key, value, type, description) VALUES
    ('auto_assign_enabled', 'true', 'boolean', 'Enable automatic assignment of requests'),
    ('notification_email_enabled', 'true', 'boolean', 'Enable email notifications'),
    ('notification_sms_enabled', 'false', 'boolean', 'Enable SMS notifications'),
    ('max_file_size', '10485760', 'integer', 'Maximum file size in bytes (10MB)'),
    ('allowed_file_types', 'jpg,jpeg,png,gif,pdf', 'string', 'Comma-separated list of allowed file extensions'),
    ('maintenance_mode', 'false', 'boolean', 'Enable maintenance mode'),
    ('default_urgency', 'medium', 'string', 'Default urgency level for new requests');

-- Insert sample locations
INSERT INTO locations (building, floor, room) VALUES
    ('Science Building', '1', '101'),
    ('Science Building', '1', '102'),
    ('Science Building', '2', '201'),
    ('Science Building', '2', '202'),
    ('Main Library', 'Ground', 'Reading Hall'),
    ('Main Library', '1', 'Computer Lab'),
    ('Main Library', '2', 'Study Room A'),
    ('Dormitory A', '1', '101'),
    ('Dormitory A', '2', '201'),
    ('Dormitory B', '1', '101'),
    ('Admin Building', 'Ground', 'Reception'),
    ('Admin Building', '1', 'Conference Room'),
    ('Engineering Lab', 'Ground', 'Workshop'),
    ('Student Center', 'Ground', 'Cafeteria'),
    ('Sports Complex', 'Ground', 'Gym');

-- Insert sample admin user (password: admin123)
-- Note: In production, use proper password hashing
INSERT INTO users (name, email, password, role, department) VALUES
    ('Admin User', 'admin@campus.edu', '$2b$10$YourHashedPasswordHere', 'admin', 'Administration');

-- Grant permissions (adjust based on your PostgreSQL setup)
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_app_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_app_user;

-- View to get request statistics
CREATE VIEW request_statistics AS
SELECT 
    COUNT(*) as total_requests,
    COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_requests,
    COUNT(CASE WHEN status = 'in-progress' THEN 1 END) as in_progress_requests,
    COUNT(CASE WHEN status = 'resolved' THEN 1 END) as resolved_requests,
    COUNT(CASE WHEN resolved_at::date = CURRENT_DATE THEN 1 END) as resolved_today,
    AVG(CASE 
        WHEN resolved_at IS NOT NULL 
        THEN EXTRACT(EPOCH FROM (resolved_at - created_at))/3600 
    END) as avg_resolution_hours
FROM requests;

-- View to get technician performance
CREATE VIEW technician_performance AS
SELECT 
    u.id,
    u.name,
    t.specialization,
    t.rating,
    COUNT(DISTINCT r.id) as total_resolved,
    AVG(EXTRACT(EPOCH FROM (r.resolved_at - r.created_at))/3600) as avg_resolution_hours,
    COUNT(DISTINCT CASE WHEN r.resolved_at::date = CURRENT_DATE THEN r.id END) as resolved_today
FROM users u
JOIN technicians t ON u.id = t.user_id
LEFT JOIN requests r ON r.resolved_by = u.id AND r.status = 'resolved'
WHERE u.role = 'technician'
GROUP BY u.id, u.name, t.specialization, t.rating;