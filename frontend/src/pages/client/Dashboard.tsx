import React from 'react';
import { FiCheckCircle, FiAlertCircle, FiClock, FiFileText } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ClientDashboard = () => {
  // Placeholder data
  const applicationStatus = {
    status: 'In Progress',
    progress: 60,
    nextSteps: 'Upload missing documents',
    dueDate: 'June 30, 2025',
  };
  
  const tasks = [
    { id: 1, name: 'Complete personal information', status: 'complete', href: '/questionnaire/1' },
    { id: 2, name: 'Upload passport copy', status: 'complete', href: '/documents/1' },
    { id: 3, name: 'Provide employment history', status: 'pending', href: '/questionnaire/2' },
    { id: 4, name: 'Upload financial documents', status: 'pending', href: '/documents/2' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Client Dashboard</h1>
      
      {/* Application Status Card */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-medium mb-4">Your Application Status</h2>
          <div className="flex items-center mb-4">
            <div className="rounded-full h-10 w-10 flex items-center justify-center bg-blue-100">
              <FiFileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-lg font-medium">{applicationStatus.status}</p>
              <p className="text-sm text-gray-500">Due: {applicationStatus.dueDate}</p>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${applicationStatus.progress}%` }}
            ></div>
          </div>
          
          <div className="mt-3 flex items-center text-sm text-gray-500">
            <FiAlertCircle className="flex-shrink-0 mr-1.5 h-5 w-5 text-blue-600" />
            <p>Next steps: {applicationStatus.nextSteps}</p>
          </div>
          
          <Link to="/status" className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            View Full Status
          </Link>
        </div>
      </div>
      
      {/* Tasks Card */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-medium mb-4">Your Tasks</h2>
          <div className="space-y-4">
            {tasks.map((task) => (
              <Link
                key={task.id}
                to={task.href}
                className="block"
              >
                <div className="flex items-center">
                  {task.status === 'complete' ? (
                    <FiCheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <FiClock className="h-5 w-5 text-yellow-500" />
                  )}
                  <span
                    className={`ml-3 ${
                      task.status === 'complete' ? 'text-gray-500 line-through' : 'text-gray-900'
                    }`}
                  >
                    {task.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
          <p className="text-gray-500">Placeholder for activity timeline</p>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;