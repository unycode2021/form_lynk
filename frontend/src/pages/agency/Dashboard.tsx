import React from 'react';
import { FiUsers, FiFileText, FiClipboard, FiAlertCircle, FiCheck, FiClock, FiCalendar } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const AgencyDashboard = () => {
  // Enhanced placeholder data
  const stats = [
    { name: 'Active Clients', value: '24', icon: FiUsers, color: 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400' },
    { name: 'Pending Questionnaires', value: '8', icon: FiFileText, color: 'bg-warning-100 text-warning-600 dark:bg-warning-900/30 dark:text-warning-400' },
    { name: 'Missing Documents', value: '12', icon: FiClipboard, color: 'bg-error-100 text-error-600 dark:bg-error-900/30 dark:text-error-400' },
    { name: 'Upcoming Deadlines', value: '5', icon: FiAlertCircle, color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' },
  ];
  
  // Recent activity data
  const activities = [
    { 
      id: 1, 
      user: 'John Smith', 
      action: 'submitted questionnaire', 
      time: '30 minutes ago',
      status: 'completed',
      icon: FiCheck 
    },
    { 
      id: 2, 
      user: 'Maria Garcia', 
      action: 'uploaded passport scan', 
      time: '2 hours ago',
      status: 'completed',
      icon: FiCheck 
    },
    { 
      id: 3, 
      user: 'Robert Chen', 
      action: 'needs to complete employment history', 
      time: 'Yesterday',
      status: 'pending',
      icon: FiClock 
    },
    { 
      id: 4, 
      user: 'Emily Johnson', 
      action: 'visa approved', 
      time: '2 days ago',
      status: 'success',
      icon: FiCheck 
    },
  ];
  
  // Upcoming deadlines
  const deadlines = [
    { id: 1, client: 'Robert Chen', document: 'Employment Verification', due: 'Tomorrow' },
    { id: 2, client: 'Aisha Patel', document: 'Financial Statements', due: 'June 18, 2025' },
    { id: 3, client: 'David Kim', document: 'Medical Exam Results', due: 'June 20, 2025' },
    { id: 4, client: 'Sofia Rodriguez', document: 'Biometrics Appointment', due: 'June 23, 2025' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Here's what's happening with your clients today.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Link 
            to="/clients/new"
            className="btn-primary"
          >
            <FiUsers className="mr-2 h-4 w-4" />
            Add Client
          </Link>
        </div>
      </div>
      
      {/* Stats cards with improved styling */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="card">
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{stat.name}</dt>
                    <dd className="text-3xl font-semibold text-gray-900 dark:text-white">{stat.value}</dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 px-5 py-3 border-t border-gray-100 dark:border-gray-700">
              <Link to={stat.name.toLowerCase().replace(' ', '-')} className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                View all
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {/* Content grid with activity and deadlines */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="card">
          <div className="border-b border-gray-100 dark:border-gray-700 px-5 py-4">
            <h2 className="text-lg font-medium">Recent Activity</h2>
          </div>
          <div className="px-5 py-3">
            <ul className="divide-y divide-gray-100 dark:divide-gray-700">
              {activities.map((activity) => (
                <li key={activity.id} className="py-3 flex items-start">
                  <div className={`flex-shrink-0 rounded-full p-1.5 mt-0.5 ${
                    activity.status === 'completed' ? 'bg-success-100 text-success-600 dark:bg-success-900/30 dark:text-success-400' :
                    activity.status === 'pending' ? 'bg-warning-100 text-warning-600 dark:bg-warning-900/30 dark:text-warning-400' :
                    'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                  }`}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">
                      <a href="#" className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                        {activity.user}
                      </a>{' '}
                      {activity.action}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                      {activity.time}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-center">
              <Link to="/activities" className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                View all activity →
              </Link>
            </div>
          </div>
        </div>
        
        {/* Upcoming Deadlines */}
        <div className="card">
          <div className="border-b border-gray-100 dark:border-gray-700 px-5 py-4">
            <h2 className="text-lg font-medium">Upcoming Deadlines</h2>
          </div>
          <div className="px-5 py-3">
            <ul className="divide-y divide-gray-100 dark:divide-gray-700">
              {deadlines.map((deadline) => (
                <li key={deadline.id} className="py-3 flex items-center">
                  <div className="flex-shrink-0 rounded-full p-1.5 bg-warning-100 text-warning-600 dark:bg-warning-900/30 dark:text-warning-400">
                    <FiCalendar className="h-4 w-4" />
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{deadline.client}</p>
                      <span className="badge-warning">{deadline.due}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                      {deadline.document}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-center">
              <Link to="/deadlines" className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                View all deadlines →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgencyDashboard;