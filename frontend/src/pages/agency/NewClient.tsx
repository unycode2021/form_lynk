import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiUser, FiMail, FiPhone, FiSave, FiLock, FiAlertCircle, FiArrowLeft } from 'react-icons/fi';
import { useFrappePostCall } from "frappe-react-sdk";

const NewClient = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [clientData, setClientData] = useState({
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    sendWelcomeEmail: false
  });

  const { call } = useFrappePostCall("form_link.api.auth.create_client");

  const handleChange = (e: { target: { name: string; value: any; type: string; checked?: boolean; }; }) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setClientData(prev => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await call({
        email: clientData.email,
        full_name: clientData.fullName,
        phone: clientData.phone,
        gender: clientData.gender,
        send_welcome_email: clientData.sendWelcomeEmail
      });

      setSuccess(result.message || "Client created successfully.");

      // Redirect to client list after a short delay
      setTimeout(() => {
        navigate('/clients');
      }, 1500);

    } catch (err: any) {
      setError(err.message || "An error occurred while creating the client.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="mb-6">
        <Link
          to="/clients"
          className="btn-secondary inline-flex items-center"
        >
          <FiArrowLeft className="mr-2 h-4 w-4" />
          Back to Clients
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-4">New Client</h1>
        <p className="text-gray-600 mt-1">Create a new client account</p>
      </div>

      {error && (
        <div className="mb-6 rounded-md bg-red-50 p-4 border border-red-200">
          <div className="flex">
            <FiAlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
            <div className="ml-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="mb-6 rounded-md bg-green-50 p-4 border border-green-200">
          <div className="flex">
            <FiAlertCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
            <div className="ml-3">
              <p className="text-sm text-green-800">{success}</p>
            </div>
          </div>
        </div>
      )}

      <div className="card">
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="form-label">
                    Full Name
                  </label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      required
                      className="form-input pl-10"
                      value={clientData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="form-input pl-10"
                      value={clientData.email}
                      onChange={handleChange}
                      placeholder="client@example.com"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPhone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      className="form-input pl-10"
                      value={clientData.phone}
                      onChange={handleChange}
                      placeholder="+1 (123) 456-7890"
                    />
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label htmlFor="gender" className="form-label">
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    className="form-input"
                    value={clientData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              {/* Send Welcome Email */}
              <div className="flex items-center mt-4">
                <input
                  id="sendWelcomeEmail"
                  name="sendWelcomeEmail"
                  type="checkbox"
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={clientData.sendWelcomeEmail}
                  onChange={handleChange}
                />
                <label htmlFor="sendWelcomeEmail" className="ml-2 block text-sm text-gray-700">
                  Send Welcome Email
                </label>
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <Link
                to="/clients"
                className="btn-secondary"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="btn-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v16a8 8 0 01-8-8z"
                      />
                    </svg>
                    Creating...
                  </>
                ) : (
                  <>
                    <FiSave className="mr-2 h-4 w-4" />
                    Save Client
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewClient;