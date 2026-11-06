import React, { useState, useContext, useEffect } from 'react';
import { FiSearch, FiUserPlus, FiFileText, FiEye, FiMoreVertical } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { UserListContext } from '@/utils/users/UserListProvider';
import useFetchActiveUsers from '@/hooks/fetchers/useFetchActiveUsers';

const ClientManagement = () => {
  // Get clients from UserListContext
  const { users } = useContext(UserListContext);
  const { data: activeUsers } = useFetchActiveUsers();
  
  // Filter only clients from the user list
  const clients = users.filter(user => user.type === 'Client');
  
  // State for dropdown menu
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  
  // State for search functionality
  const [searchTerm, setSearchTerm] = useState('');
  
  // Toggle dropdown menu
  const toggleDropdown = (userId: number) => {
    setActiveDropdown(activeDropdown === userId ? null : userId);
  };
  
  // Start new application modal
  const [showNewApplicationModal, setShowNewApplicationModal] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  
  const startNewApplication = (clientId: string) => {
    setSelectedClientId(clientId);
    setShowNewApplicationModal(true);
    setActiveDropdown(null);
  };

  // Check if user is active
  const isUserActive = (userId: string) => {
    return activeUsers?.message?.includes(userId) || false;
  };

  // Filter clients based on search term
  const filteredClients = clients.filter(client => 
    client.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/clients/new"
            className="btn-primary"
          >
            <FiUserPlus className="-ml-1 mr-2 h-5 w-5" />
            New Client
          </Link>
        </div>
      </div>
      
      <div className="card">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-900">All Clients</h2>
              <p className="mt-1 text-sm text-gray-500">
                {filteredClients.length} clients found
              </p>
            </div>
            <div className="mt-4 sm:mt-0 w-full sm:w-64">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input pl-10"
                  placeholder="Search clients"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          {filteredClients.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredClients.map((client) => (
                  <tr key={client.name}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {client.user_image ? (
                            <img className="h-10 w-10 rounded-full" src={client.user_image} alt="" />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <span className="text-gray-600 font-medium">
                                {client.first_name?.charAt(0) || client.full_name.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{client.full_name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={isUserActive(client.name) ? 'badge-success' : 'badge-gray'}>
                        {isUserActive(client.name) ? 'Online' : 'Offline'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {client.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="relative" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={() => toggleDropdown(parseInt(client.name))}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <FiMoreVertical className="h-5 w-5" />
                        </button>
                        
                        {activeDropdown === parseInt(client.name) && (
                          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                            <div className="py-1" role="menu">
                              <button
                                onClick={() => startNewApplication(client.name)}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                              >
                                <FiFileText className="mr-2 h-4 w-4 inline" />
                                Start New Application
                              </button>
                              <Link
                                to={`/clients/${client.name}/view`}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                              >
                                <FiEye className="mr-2 h-4 w-4 inline" />
                                View Client
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-8 text-center">
              <p className="text-gray-500">
                {searchTerm ? 'No clients match your search.' : 'No clients found. Add a new client to get started.'}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* New Application Modal */}
      {showNewApplicationModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowNewApplicationModal(false)}></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Start New Application
                </h3>
                <div className="mt-2">
                  <label htmlFor="applicationType" className="form-label">
                    Application Type
                  </label>
                  <select
                    id="applicationType"
                    name="applicationType"
                    className="form-input mt-1"
                  >
                    <option value="">Select application type</option>
                    <option value="student_visa">Student Visa</option>
                    <option value="work_visa">Work Visa</option>
                    <option value="visitor_visa">Visitor Visa</option>
                    <option value="family_visa">Family Visa</option>
                  </select>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button 
                  type="button" 
                  className="btn-primary sm:ml-3"
                >
                  Start Application
                </button>
                <button 
                  type="button" 
                  className="btn-secondary mt-3 sm:mt-0"
                  onClick={() => setShowNewApplicationModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientManagement;