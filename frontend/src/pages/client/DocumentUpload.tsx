import React from 'react';
import { useParams } from 'react-router-dom';
import { FiUpload, FiFile, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const DocumentUpload = () => {
       const { id } = useParams<{ id: string }>();

       // Placeholder data
       const documentRequests = [
              { id: 1, name: 'Passport Copy', description: 'Full passport including all pages', required: true, status: 'uploaded' },
              { id: 2, name: 'Photo', description: 'Recent passport-style photo', required: true, status: 'pending' },
              { id: 3, name: 'Employment Letter', description: 'Letter from your current employer', required: true, status: 'pending' },
              { id: 4, name: 'Bank Statements', description: 'Last 6 months of bank statements', required: true, status: 'pending' },
              { id: 5, name: 'Previous Visas', description: 'Copies of previous visas (if applicable)', required: false, status: 'not_applicable' },
       ];

       return (
              <div className="max-w-3xl mx-auto">
                     <h1 className="text-2xl font-bold mb-6">Document Upload</h1>

                     <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
                            <div className="p-6">
                                   <h2 className="text-lg font-medium mb-4">Required Documents</h2>
                                   <p className="text-gray-600 mb-6">
                                          Please upload the following documents for your application. All documents should be clear scans or photos of the original documents.
                                   </p>

                                   <ul className="space-y-6">
                                          {documentRequests.map((doc) => (
                                                 <li key={doc.id} className="border rounded-md p-4">
                                                        <div className="flex items-center justify-between">
                                                               <div className="flex items-center">
                                                                      <FiFile className="h-5 w-5 text-gray-400" />
                                                                      <span className="ml-2 text-lg font-medium">
                                                                             {doc.name}
                                                                             {doc.required && <span className="text-red-500 ml-1">*</span>}
                                                                      </span>
                                                               </div>
                                                               {doc.status === 'uploaded' ? (
                                                                      <FiCheckCircle className="h-5 w-5 text-green-500" />
                                                               ) : doc.status === 'pending' ? (
                                                                      <FiAlertCircle className="h-5 w-5 text-yellow-500" />
                                                               ) : null}
                                                        </div>

                                                        <p className="text-sm text-gray-500 mt-1">{doc.description}</p>

                                                        {doc.status !== 'uploaded' && doc.status !== 'not_applicable' && (
                                                               <div className="mt-3">
                                                                      <label
                                                                             htmlFor={`file-upload-${doc.id}`}
                                                                             className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                                      >
                                                                             <FiUpload className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                                                             Upload File
                                                                      </label>
                                                                      <input id={`file-upload-${doc.id}`} name={`file-upload-${doc.id}`} type="file" className="sr-only" />
                                                               </div>
                                                        )}

                                                        {doc.status === 'uploaded' && (
                                                               <div className="mt-3 text-sm text-green-600">
                                                                      Document uploaded successfully
                                                               </div>
                                                        )}
                                                 </li>
                                          ))}
                                   </ul>
                            </div>
                     </div>

                     <div className="flex justify-end">
                            <button
                                   type="button"
                                   className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                   Submit All Documents
                            </button>
                     </div>
              </div>
       );
};

export default DocumentUpload;