import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useFrappePostCall } from "frappe-react-sdk";
import { isEmailValid } from "@/utils/validations";

interface LoginWithEmailInputs {
       email: string;
}

const LoginWithEmail = () => {
       const [successMessage, setSuccessMessage] = useState<string | null>(null);

       const {
              register,
              handleSubmit,
              formState: { errors, isSubmitting },
       } = useForm<LoginWithEmailInputs>();

       
       const { call, error } = useFrappePostCall('frappe.www.login.send_login_link')
      
       async function sendEmailLink(values: LoginWithEmailInputs) {
              return call({
                     email: values.email,
              })
                     .then((result) => {
                            setSuccessMessage("Login link sent to your email. Please check your inbox.");
                     })
                     .catch((err) => {
                            // Error is handled by the error state from useFrappePostCall
                     });
       }

       return (
              <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                     <div className="max-w-md w-full space-y-8">
                            <div>
                                   <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                          Login with Email Link
                                   </h2>
                                   <p className="mt-2 text-center text-sm text-gray-600">
                                          We'll send you a magic link to sign in without a password
                                   </p>
                            </div>

                            {error && (
                                   <div className="rounded-md bg-red-50 p-4">
                                          <div className="flex">
                                                 <div className="flex-shrink-0">
                                                        <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 001.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                        </svg>
                                                 </div>
                                                 <div className="ml-3">
                                                        <h3 className="text-sm font-medium text-red-800">{error.message}</h3>
                                                 </div>
                                          </div>
                                   </div>
                            )}

                            {successMessage && (
                                   <div className="rounded-md bg-green-50 p-4">
                                          <div className="flex">
                                                 <div className="flex-shrink-0">
                                                        <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                        </svg>
                                                 </div>
                                                 <div className="ml-3">
                                                        <h3 className="text-sm font-medium text-green-800">{successMessage}</h3>
                                                 </div>
                                          </div>
                                   </div>
                            )}

                            <form className="mt-8 space-y-6" onSubmit={handleSubmit(sendEmailLink)}>
                                   <div>
                                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                 Email address
                                          </label>
                                          <div className="mt-1">
                                                 <input
                                                        {...register("email", {
                                                               required: "Email is required.",
                                                               validate: (email) => isEmailValid(email) || "Please enter a valid email address.",
                                                        })}
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        autoComplete="email"
                                                        required
                                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                        placeholder="jane@example.com"
                                                 />
                                                 {errors?.email && (
                                                        <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                                                 )}
                                          </div>
                                   </div>

                                   <div>
                                          <button
                                                 type="submit"
                                                 disabled={isSubmitting}
                                                 className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
                                          >
                                                 {isSubmitting ? (
                                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                 ) : (
                                                        "Send Login Link"
                                                 )}
                                          </button>
                                   </div>
                            </form>

                            <div className="text-center">
                                   <Link
                                          to="/login"
                                          className="font-medium text-blue-600 hover:text-blue-500"
                                   >
                                          Back to Login
                                   </Link>
                            </div>
                     </div>
              </div>
       );
};

export default LoginWithEmail;