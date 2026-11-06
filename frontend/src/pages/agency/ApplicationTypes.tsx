import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

// Define application type interfaces
interface ApplicationType {
  id: string;
  name: string;
  country: string;
  description: string;
  documents: string[]; // IDs of required documents
  questionnaire: string; // ID of associated questionnaire
  createdAt: string;
}

const ApplicationTypes = () => {
  // Sample application types
  const [applicationTypes, setApplicationTypes] = useState<ApplicationType[]>([
    {
      id: '1',
      name: 'Student Visa',
      country: 'USA',
      description: 'F-1 visa for international students attending US educational institutions.',
      documents: ['passport', 'financial_proof', 'admission_letter'],
      questionnaire: 'student_usa_questionnaire',
      createdAt: '2025-06-01'
    },
    {
      id: '2',
      name: 'Work Visa',
      country: 'USA',
      description: 'H-1B visa for skilled workers in specialty occupations.',
      documents: ['passport', 'resume', 'job_offer', 'qualifications'],
      questionnaire: 'work_usa_questionnaire',
      createdAt: '2025-05-28'
    },
    {
      id: '3',
      name: 'Study Permit',
      country: 'Canada',
      description: 'Permit for international students to study at designated learning institutions in Canada.',
      documents: ['passport', 'acceptance_letter', 'financial_support'],
      questionnaire: 'study_canada_questionnaire',
      createdAt: '2025-06-10'
    },
    {
      id: '4',
      name: 'Work Permit',
      country: 'Canada',
      description: 'Permit for foreign workers to work for a Canadian employer.',
      documents: ['passport', 'lmia', 'job_offer'],
      questionnaire: 'work_canada_questionnaire',
      createdAt: '2025-06-05'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Application Types</h1>
        <div className="mt-3 sm:mt-0">
          <Link
            to="/application-types/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiPlus className="-ml-1 mr-2 h-5 w-5" />
            New Application Type
          </Link>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h2 className="text-lg font-medium">All Application Types</h2>
              <p className="mt-2 text-sm text-gray-500">
                A list of all application types with their associated country, documents and questionnaires.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <div className="relative">
                <input
                  type="text"
                  className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search application types"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Country
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Description
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        # Documents
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {applicationTypes.map((appType) => (
                      <tr key={appType.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {appType.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {appType.country}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 max-w-md truncate">
                          {appType.description}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {appType.documents.length}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button 
                            className="text-blue-600 hover:text-blue-900 mr-4"
                            onClick={() => {/* Edit application type */}}
                          >
                            <FiEdit2 className="h-5 w-5" />
                            <span className="sr-only">Edit {appType.name}</span>
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-900"
                            onClick={() => {/* Delete application type */}}
                          >
                            <FiTrash2 className="h-5 w-5" />
                            <span className="sr-only">Delete {appType.name}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationTypes;