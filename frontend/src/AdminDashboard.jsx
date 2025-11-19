import React, { useState, useEffect } from 'react';
import RequestResolution from './RequestResolution';
import { 
  Home, 
  FileText, 
  Users, 
  Settings, 
  BarChart3, 
  Bell, 
  Search,
  Filter,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  UserCheck,
  Wrench,
  Building,
  MapPin,
  TrendingUp,
  Download,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  ChevronDown,
  Menu,
  X,
  LogOut,
  User
} from 'lucide-react';
import { Request, Technician, Stats, Filters } from './types';
import api from '../services/apiService';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [requests, setRequests] = useState<Request[]>([]);
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalRequests: 0,
    pendingRequests: 0,
    inProgressRequests: 0,
    resolvedToday: 0,
    avgResolutionTime: '0 hours',
    satisfactionRate: '0%'
  });
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [showResolutionModal, setShowResolutionModal] = useState<boolean>(false);
  const [requestToResolve, setRequestToResolve] = useState<Request | null>(null);
  const [filters, setFilters] = useState<Filters>({
    status: 'all',
    category: 'all',
    urgency: 'all',
    dateRange: 'all'
  });

  // Handle resolution
  const handleResolve = async (resolutionData: any) => {
    try {
      // Call API to save resolution
      await api.resolutions.createResolutionWithImages(
        resolutionData.requestId, 
        resolutionData.formData
      );
      
      // Update the request status locally
      setRequests(requests.map(req => 
        req.id === resolutionData.requestId 
          ? { ...req, status: 'resolved' } 
          : req
      ));
      
      // Close modals
      setShowResolutionModal(false);
      setRequestToResolve(null);
      setSelectedRequest(null);
      
      // Refresh data
      await fetchDashboardData();
    } catch (error) {
      console.error('Error resolving request:', error);
      alert('Failed to resolve request. Please try again.');
    }
  };

  const openResolutionModal = (request: Request) => {
    setRequestToResolve(request);
    setShowResolutionModal(true);
    setSelectedRequest(null);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch stats
      const statsResponse = await api.analytics.getDashboardStats();
      setStats(statsResponse.data);

      // Fetch requests
      const requestsResponse = await api.requests.getRequests({ 
        limit: 10, 
        status: filters.status !== 'all' ? filters.status : undefined 
      });
      setRequests(requestsResponse.data);

      // Fetch technicians
      const techniciansResponse = await api.technicians.getTechnicians({});
      setTechnicians(techniciansResponse.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Use mock data as fallback
      loadMockData();
    }
  };

  const loadMockData = () => {
    setStats({
      totalRequests: 156,
      pendingRequests: 42,
      inProgressRequests: 28,
      resolvedToday: 15,
      avgResolutionTime: '4.2 hours',
      satisfactionRate: '94%'
    });

    setRequests([
      {
        id: 1,
        title: 'Broken AC in Room 204',
        category: 'HVAC',
        location: 'Science Building',
        status: 'pending',
        urgency: 'high',
        submittedBy: 'John Doe',
        submittedAt: '2025-01-15T10:30:00',
        description: 'The air conditioning unit is making loud noises and not cooling properly.',
        assignedTo: null,
        resolvedAt: null,
        resolvedBy: null
      },
      {
        id: 2,
        title: 'WiFi Down in Library',
        category: 'IT',
        location: 'Main Library',
        status: 'in-progress',
        urgency: 'critical',
        submittedBy: 'Jane Smith',
        submittedAt: '2025-01-15T09:15:00',
        assignedTo: 'Tech Team A',
        description: 'Students cannot connect to WiFi on the second floor.',
        resolvedAt: null,
        resolvedBy: null
      },
      {
        id: 3,
        title: 'Water Leak in Bathroom',
        category: 'Plumbing',
        location: 'Dormitory B',
        status: 'resolved',
        urgency: 'medium',
        submittedBy: 'Mike Johnson',
        submittedAt: '2025-01-14T14:20:00',
        resolvedAt: '2025-01-15T11:00:00',
        resolvedBy: 'Maintenance Team',
        description: 'Minor leak from sink faucet.',
        assignedTo: 'Maintenance Team'
      }
    ]);

    setTechnicians([
      { 
        id: 1, 
        name: 'Tech Team A', 
        activeTickets: 5, 
        specialization: 'IT', 
        status: 'available',
        currentWorkload: 3,
        maxCapacity: 8,
        availability: 'available',
        location: 'North Campus',
        rating: 4.8,
        completedToday: 5,
        avgResolutionTime: 1.2,
        skills: ['IT', 'Networking'],
        currentTasks: []
      },
      { 
        id: 2, 
        name: 'Maintenance Team', 
        activeTickets: 3, 
        specialization: 'General', 
        status: 'busy',
        currentWorkload: 5,
        maxCapacity: 6,
        availability: 'busy',
        location: 'Central Maintenance',
        rating: 4.6,
        completedToday: 3,
        avgResolutionTime: 2.5,
        skills: ['General', 'Plumbing'],
        currentTasks: []
      },
      { 
        id: 3, 
        name: 'HVAC Specialist', 
        activeTickets: 2, 
        specialization: 'HVAC', 
        status: 'available',
        currentWorkload: 2,
        maxCapacity: 6,
        availability: 'available',
        location: 'South Campus',
        rating: 4.9,
        completedToday: 4,
        avgResolutionTime: 1.8,
        skills: ['HVAC', 'Electrical'],
        currentTasks: []
      }
    ]);
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'pending': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'resolved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <XCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    const colors: Record<string, string> = {
      low: 'bg-gray-100 text-gray-700',
      medium: 'bg-yellow-100 text-yellow-700',
      high: 'bg-orange-100 text-orange-700',
      critical: 'bg-red-100 text-red-700'
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${colors[urgency] || colors.low}`;
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalRequests}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-500 opacity-50" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pendingRequests}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-yellow-500 opacity-50" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">{stats.inProgressRequests}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-500 opacity-50" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Resolved Today</p>
              <p className="text-2xl font-bold text-green-600">{stats.resolvedToday}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500 opacity-50" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Resolution</p>
              <p className="text-2xl font-bold text-gray-900">{stats.avgResolutionTime}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500 opacity-50" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Satisfaction</p>
              <p className="text-2xl font-bold text-gray-900">{stats.satisfactionRate}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-indigo-500 opacity-50" />
          </div>
        </div>
      </div>

      {/* Recent Requests Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Requests</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Urgency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{request.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{request.title}</div>
                    <div className="text-sm text-gray-500">{request.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                      {request.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(request.status)}
                      <span className="ml-2 text-sm text-gray-900 capitalize">{request.status.replace('-', ' ')}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getUrgencyBadge(request.urgency)}>
                      {request.urgency}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(request.submittedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button 
                      onClick={() => setSelectedRequest(request)}
                      className="text-blue-600 hover:text-blue-800 mr-3"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 mr-3">
                      <Edit className="w-4 h-4" />
                    </button>
                    {request.status !== 'resolved' && (
                      <button
                        onClick={() => openResolutionModal(request)}
                        className="text-green-600 hover:text-green-800 mr-3"
                        title="Mark as Resolved"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Technician Status */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Technician Status</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {technicians.map((tech) => (
              <div key={tech.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <UserCheck className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="font-medium text-gray-900">{tech.name}</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    tech.status === 'available' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {tech.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Specialization: {tech.specialization}</p>
                  <p>Active Tickets: {tech.activeTickets}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderRequests = () => (
    <div className="space-y-6">
      {/* Filters Bar */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <Filter className="w-4 h-4 text-gray-400 mr-2" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <select 
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
          
          <select 
            value={filters.category}
            onChange={(e) => setFilters({...filters, category: e.target.value})}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="IT">IT</option>
            <option value="HVAC">HVAC</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="General">General</option>
          </select>
          
          <button className="ml-auto px-4 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Requests Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {requests.map((request) => (
          <div key={request.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  {getStatusIcon(request.status)}
                  <span className="ml-2 text-sm font-medium text-gray-600 capitalize">
                    {request.status.replace('-', ' ')}
                  </span>
                </div>
                <span className={getUrgencyBadge(request.urgency)}>
                  {request.urgency}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{request.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{request.description}</p>
              
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {request.location}
                </div>
                <div className="flex items-center">
                  <Building className="w-4 h-4 mr-2" />
                  {request.category}
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  {request.submittedBy}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(request.submittedAt).toLocaleString()}
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
                <button 
                  onClick={() => setSelectedRequest(request)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View Details
                </button>
                {request.status === 'pending' && (
                  <button className="text-yellow-600 hover:text-yellow-800 text-sm font-medium">
                    Assign Technician
                  </button>
                )}
                {(request.status === 'pending' || request.status === 'in-progress') && (
                  <button
                    onClick={() => openResolutionModal(request)}
                    className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Mark Resolved
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics Dashboard</h3>
        <p className="text-gray-600">Analytics visualization coming soon...</p>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Settings</h3>
        <p className="text-gray-600">Settings configuration coming soon...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-lg transition-all duration-300`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            {sidebarOpen && (
              <div className="flex items-center">
                <Wrench className="w-8 h-8 text-blue-600 mr-2" />
                <span className="text-xl font-bold text-gray-900">ServiceLink</span>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-500 hover:text-gray-700"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'overview' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Home className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Overview</span>}
            </button>
            
            <button
              onClick={() => setActiveTab('requests')}
              className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'requests' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FileText className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Requests</span>}
            </button>
            
            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'analytics' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Analytics</span>}
            </button>
            
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'settings' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Settings className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Settings</span>}
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">
                {activeTab === 'overview' && 'Dashboard Overview'}
                {activeTab === 'requests' && 'Manage Requests'}
                {activeTab === 'analytics' && 'Analytics & Reports'}
                {activeTab === 'settings' && 'System Settings'}
              </h1>
              <div className="flex items-center space-x-4">
                <button className="relative p-2 text-gray-600 hover:text-gray-900">
                  <Bell className="w-6 h-6" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button 
                  onClick={() => fetchDashboardData()}
                  className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border rounded-lg hover:bg-gray-50"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'requests' && renderRequests()}
          {activeTab === 'analytics' && renderAnalytics()}
          {activeTab === 'settings' && renderSettings()}
        </div>
      </div>

      {/* Request Detail Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Request Details</h2>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedRequest.title}</h3>
                  <p className="text-gray-600 mt-2">{selectedRequest.description}</p>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  {(selectedRequest.status === 'pending' || selectedRequest.status === 'in-progress') && (
                    <button 
                      onClick={() => openResolutionModal(selectedRequest)}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark as Resolved
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Request Resolution Modal */}
      {showResolutionModal && requestToResolve && (
        <RequestResolution
          request={requestToResolve}
          onClose={() => {
            setShowResolutionModal(false);
            setRequestToResolve(null);
          }}
          onResolve={handleResolve}
        />
      )}
    </div>
  );
};

export default AdminDashboard;