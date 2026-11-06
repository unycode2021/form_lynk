import React from 'react';
import { FiPlus, FiEdit2, FiCopy, FiTrash2 } from 'react-icons/fi';

const QuestionnaireBuilder = () => {
  // Placeholder data
  const questionnaires = [
    { id: 1, name: 'Work Visa - General', questions: 35, lastUpdated: '2023-06-01' },
    { id: 2, name: 'Student Visa - Full Application', questions: 28, lastUpdated: '2023-05-25' },
    { id: 3, name: 'Family Sponsorship', questions: 42, lastUpdated: '2023-05-18' },
    { id: 4, name: 'Visitor Visa - Tourism', questions: 15, lastUpdated: '2023-06-10' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Questionnaire Builder</h1>
        <div className="mt-3 sm:mt-0">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiPlus className="-ml-1 mr-2 h-5 w-5" />
            Create New
          </button>
        </div>
      </div>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {questionnaires.map((questionnaire) => (
            <li key={questionnaire.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-blue-600 truncate">{questionnaire.name}</p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {questionnaire.questions} Questions
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      Last updated on {questionnaire.lastUpdated}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <button className="mr-3 text-blue-600 hover:text-blue-800">
                      <FiEdit2 className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </button>
                    <button className="mr-3 text-blue-600 hover:text-blue-800">
                      <FiCopy className="h-4 w-4" />
                      <span className="sr-only">Duplicate</span>
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <FiTrash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuestionnaireBuilder;