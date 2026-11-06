import React from 'react';
import { FiCheckCircle, FiClock, FiAlertCircle } from 'react-icons/fi';

const ApplicationStatus = () => {
       // Placeholder data
       const applicationDetails = {
              type: 'Work Visa',
              reference: 'WV-2023-12345',
              submissionDate: '2025-05-01',
              status: 'In Progress',
              estimatedCompletion: '2025-07-15',
       };

       const statusTimeline = [
              { id: 1, name: 'Application Started', date: 'May 1, 2025', status: 'complete' },
              { id: 2, name: 'Initial Documents Submitted', date: 'May 10, 2025', status: 'complete' },
              { id: 3, name: 'Application Review', date: 'May 20, 2025', status: 'current' },
              { id: 4, name: 'Additional Documents Requested', date: 'June 5, 2025', status: 'upcoming' },
              { id: 5, name: 'Final Review', date: 'June 30, 2025', status: 'upcoming' },
              { id: 6, name: 'Decision', date: 'July 15, 2025', status: 'upcoming' },
       ];

       const getStatusIcon = (status: string) => {
              switch (status) {
                     case 'complete':
                            return <FiCheckCircle className="h-6 w-6 text-green-500" />;
                     case 'current':
                            return <FiClock className="h-6 w-6 text-blue-500" />;
                     case 'upcoming':
                            return <FiAlertCircle className="h-6 w-6 text-gray-300" />;
                     default:
                            return null;
              }
       };

       return (
              <div className="max-w-3xl mx-auto">
                     <h1 className="text-2xl font-bold mb-6">Application Status</h1>

                     <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
                            <div className="p-6">
                                   <h2 className="text-lg font-medium mb-4">Application Details</h2>

                                   <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                                          <div>
                                                 <dt className="text-sm font-medium text-gray-500">Application Type</dt>
                                                 <dd className="mt-1 text-sm text-gray-900">{applicationDetails.type}</dd>
                                          </div>

                                          <div>
                                                 <dt className="text-sm font-medium text-gray-500">Reference Number</dt>
                                                 <dd className="mt-1 text-sm text-gray-900">{applicationDetails.reference}</dd>
                                          </div>

                                          <div>
                                                 <dt className="text-sm font-medium text-gray-500">Submission Date</dt>
                                                 <dd className="mt-1 text-sm text-gray-900">{applicationDetails.submissionDate}</dd>
                                          </div>

                                          <div>
                                                 <dt className="text-sm font-medium text-gray-500">Current Status</dt>
                                                 <dd className="mt-1 text-sm text-blue-600 font-medium">{applicationDetails.status}</dd>
                                          </div>

                                          <div>
                                                 <dt className="text-sm font-medium text-gray-500">Estimated Completion</dt>
                                                 <dd className="mt-1 text-sm text-gray-900">{applicationDetails.estimatedCompletion}</dd>
                                          </div>
                                   </dl>
                            </div>
                     </div>

                     <div className="bg-white shadow rounded-lg overflow-hidden">
                            <div className="p-6">
                                   <h2 className="text-lg font-medium mb-4">Status Timeline</h2>

                                   <div className="flow-root">
                                          <ul role="list" className="-mb-8">
                                                 {statusTimeline.map((event, eventIdx) => (
                                                        <li key={event.id}>
                                                               <div className="relative pb-8">
                                                                      {eventIdx !== statusTimeline.length - 1 ? (
                                                                             <span
                                                                                    className={`absolute top-4 left-4 -ml-px h-full w-0.5 ${event.status === 'upcoming' ? 'bg-gray-200' : 'bg-blue-600'
                                                                                           }`}
                                                                                    aria-hidden="true"
                                                                             />
                                                                      ) : null}
                                                                      <div className="relative flex space-x-3">
                                                                             <div>
                                                                                    <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white">
                                                                                           {getStatusIcon(event.status)}
                                                                                    </span>
                                                                             </div>
                                                                             <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                                                                    <div>
                                                                                           <p
                                                                                                  className={`text-sm font-medium ${event.status === 'upcoming' ? 'text-gray-500' : 'text-gray-900'
                                                                                                         }`}
                                                                                           >
                                                                                                  {event.name}
                                                                                           </p>
                                                                                    </div>
                                                                                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                                                                           <time dateTime={event.date}>{event.date}</time>
                                                                                    </div>
                                                                             </div>
                                                                      </div>
                                                               </div>
                                                        </li>
                                                 ))}
                                          </ul>
                                   </div>
                            </div>
                     </div>
              </div>
       );
};

export default ApplicationStatus;