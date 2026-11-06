import React from 'react';
import { FiPlus, FiEdit2, FiClipboard } from 'react-icons/fi';

const DocumentChecklists = () => {
  // Placeholder data
  const checklists = [
    { id: 1, name: 'Work Visa Documents', items: 12, visaType: 'Work Visa' },
    { id: 2, name: 'Student Documents', items: 8, visaType: 'Student Visa' },
    { id: 3, name: 'Family Sponsorship Documents', items: 15, visaType: 'Family Visa' },
    { id: 4, name: 'Visitor Documents', items: 5, visaType: 'Visitor Visa' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Document Checklists</h1>
        <div className="mt-3 sm:mt-0">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiPlus className="-ml-1 mr-2 h-5 w-5" />
            Create Checklist
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {checklists.map((checklist) => (
          <div key={checklist.id} className="relative bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiClipboard className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-medium text-gray-900">{checklist.name}</h2>
                <p className="text-sm text-gray-500">{checklist.visaType}</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{checklist.items} required documents</p>
                <button
                  type="button"
                  className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FiEdit2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
            <a
              href="#"
              className="absolute inset-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentChecklists;