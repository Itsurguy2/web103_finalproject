import React, { useState } from 'react';
import {
  CheckCircle,
  X,
  Upload,
  Image,
  FileText,
  Calendar,
  User,
  MapPin,
  Clock,
  AlertCircle,
  Trash2,
  Eye,
  Download
} from 'lucide-react';
import { Request, ResolutionData } from './types';

interface RequestResolutionProps {
  request: Request;
  onClose: () => void;
  onResolve: (data: ResolutionData) => Promise<void>;
}

interface UploadedImage {
  id: string;
  file: File;
  url: string;
  name: string;
  size: string;
}

const RequestResolution: React.FC<RequestResolutionProps> = ({ request, onClose, onResolve }) => {
  const [resolutionNotes, setResolutionNotes] = useState<string>('');
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showImagePreview, setShowImagePreview] = useState<UploadedImage | null>(null);
  const [sendNotification, setSendNotification] = useState<boolean>(true);
  const [markRecurring, setMarkRecurring] = useState<boolean>(false);
  const [schedulePreventive, setSchedulePreventive] = useState<boolean>(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length !== files.length) {
      alert('Please select only image files (jpg, png, gif, etc.)');
    }

    const newImages: UploadedImage[] = imageFiles.map(file => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
      size: (file.size / 1024).toFixed(2) + ' KB',
      id: `${Date.now()}-${Math.random()}`
    }));

    setUploadedImages([...uploadedImages, ...newImages]);
    setSelectedFiles([...selectedFiles, ...imageFiles]);
  };

  const removeImage = (imageId: string) => {
    const imageToRemove = uploadedImages.find(img => img.id === imageId);
    if (imageToRemove) {
      URL.revokeObjectURL(imageToRemove.url); // Clean up object URL
    }
    
    setUploadedImages(uploadedImages.filter(img => img.id !== imageId));
    const index = uploadedImages.findIndex(img => img.id === imageId);
    if (index !== -1) {
      const newFiles = [...selectedFiles];
      newFiles.splice(index, 1);
      setSelectedFiles(newFiles);
    }
  };

  const handleResolve = async () => {
    if (!resolutionNotes.trim()) {
      alert('Please add resolution notes describing how the issue was fixed.');
      return;
    }

    setIsSubmitting(true);

    // Prepare form data for submission
    const formData = new FormData();
    formData.append('requestId', request.id.toString());
    formData.append('notes', resolutionNotes);
    formData.append('resolvedAt', new Date().toISOString());
    formData.append('sendNotification', sendNotification.toString());
    formData.append('markRecurring', markRecurring.toString());
    formData.append('schedulePreventive', schedulePreventive.toString());
    
    // Add images to form data
    selectedFiles.forEach((file, index) => {
      formData.append(`images`, file);
    });

    try {
      await onResolve({
        requestId: request.id,
        notes: resolutionNotes,
        images: selectedFiles,
        formData: formData
      });
      
      // Clean up object URLs
      uploadedImages.forEach(img => URL.revokeObjectURL(img.url));
      
      alert('Request successfully resolved!');
      onClose();
    } catch (error) {
      console.error('Error resolving request:', error);
      alert('Failed to resolve request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getUrgencyBadge = (urgency: string): string => {
    const colors: Record<string, string> = {
      low: 'bg-gray-100 text-gray-700',
      medium: 'bg-yellow-100 text-yellow-700',
      high: 'bg-orange-100 text-orange-700',
      critical: 'bg-red-100 text-red-700'
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${colors[urgency] || colors.low}`;
  };

  const getStatusIcon = (status: string): JSX.Element => {
    switch(status) {
      case 'pending': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'resolved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b bg-gradient-to-r from-green-500 to-green-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-white">
              <CheckCircle className="w-6 h-6 mr-2" />
              <h2 className="text-xl font-bold">Resolve Request</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
              type="button"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Request Details Section */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Request Details</h3>
            
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{request.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{request.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(request.status)}
                  <span className={getUrgencyBadge(request.urgency)}>
                    {request.urgency}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {request.location}
                </div>
                <div className="flex items-center text-gray-600">
                  <User className="w-4 h-4 mr-2" />
                  {request.submittedBy}
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(request.submittedAt).toLocaleDateString()}
                </div>
                <div className="flex items-center text-gray-600">
                  <FileText className="w-4 h-4 mr-2" />
                  {request.category}
                </div>
              </div>
            </div>
          </div>

          {/* Resolution Notes Section */}
          <div className="mb-6">
            <label htmlFor="resolution-notes" className="block text-sm font-medium text-gray-700 mb-2">
              Resolution Notes <span className="text-red-500">*</span>
            </label>
            <textarea
              id="resolution-notes"
              value={resolutionNotes}
              onChange={(e) => setResolutionNotes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              rows={6}
              placeholder="Describe how the issue was resolved, what actions were taken, parts replaced, etc..."
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Please provide detailed information about the resolution for future reference
            </p>
          </div>

          {/* Image Upload Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Resolution Images (Optional)
            </label>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <input
                type="file"
                id="image-upload"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              {uploadedImages.length === 0 ? (
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center cursor-pointer py-4"
                >
                  <Upload className="w-12 h-12 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Click to upload images</span>
                  <span className="text-xs text-gray-500 mt-1">
                    Upload photos showing the completed repair
                  </span>
                </label>
              ) : (
                <div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {uploadedImages.map((image) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.url}
                          alt={image.name}
                          className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => setShowImagePreview(image)}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(image.id)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg">
                          {image.size}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <label
                    htmlFor="image-upload"
                    className="mt-4 inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Add More Images
                  </label>
                </div>
              )}
            </div>
            
            {uploadedImages.length > 0 && (
              <p className="text-xs text-gray-500 mt-2">
                {uploadedImages.length} image(s) selected
              </p>
            )}
          </div>

          {/* Additional Options */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Additional Actions</h4>
            <div className="space-y-2">
              <label className="flex items-center text-sm text-blue-800">
                <input
                  type="checkbox"
                  checked={sendNotification}
                  onChange={(e) => setSendNotification(e.target.checked)}
                  className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                Send notification to request submitter
              </label>
              <label className="flex items-center text-sm text-blue-800">
                <input
                  type="checkbox"
                  checked={markRecurring}
                  onChange={(e) => setMarkRecurring(e.target.checked)}
                  className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                Mark as recurring issue for follow-up
              </label>
              <label className="flex items-center text-sm text-blue-800">
                <input
                  type="checkbox"
                  checked={schedulePreventive}
                  onChange={(e) => setSchedulePreventive(e.target.checked)}
                  className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                Add to maintenance schedule for preventive check
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-gray-50">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Resolving as: <span className="font-medium text-gray-700">
                {request.assignedTo || 'Current User'}
              </span>
            </p>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResolve}
                className={`px-6 py-2 rounded-md text-white font-medium transition-colors ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700'
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Resolved
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Image Preview Modal */}
        {showImagePreview && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60]"
            onClick={() => setShowImagePreview(null)}
          >
            <div className="max-w-4xl max-h-[90vh] relative">
              <img
                src={showImagePreview.url}
                alt={showImagePreview.name}
                className="max-w-full max-h-full object-contain"
              />
              <button
                type="button"
                onClick={() => setShowImagePreview(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="absolute bottom-4 left-4 bg-white rounded px-3 py-1 shadow-lg">
                <p className="text-sm font-medium">{showImagePreview.name}</p>
                <p className="text-xs text-gray-500">{showImagePreview.size}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestResolution;