import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiShow, BiHide, BiLogoGoogle, BiLogoFacebookCircle } from "react-icons/bi";
import { FiGithub } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { FrappeError, useFrappeAuth, useFrappeGetCall } from "frappe-react-sdk";

interface LoginInputs {
  email: string;
  password: string;
}

interface LoginContext {
  message: {
    login_label: string;
    disable_signup: number;
    two_factor_is_enabled?: boolean;
    social_login?: boolean;
    provider_logins?: SocialProvider[];
  };
}

interface SocialProvider {
  name: 'google' | 'facebook';
  provider_name: string;
  auth_url: string;
  redirect_to: string;
  icon: {
    src: string;
    alt: string;
  };
}

export const SocialProviderIcons = {
  "google": <BiLogoGoogle size="24" />,
  "facebook": <BiLogoFacebookCircle size="24" color="#316FF6" />
};

const Login = () => {
  const [error, setError] = useState<FrappeError | null>(null);
  const [isPasswordOpen, setIsPasswordOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const { data: loginContext } = useFrappeGetCall<LoginContext>(
    'form_link.api.login.get_context',
    { "redirect-to": "/form_link" }
  );

  const { login } = useFrappeAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginInputs>();

  const onClickReveal = () => {
    setIsPasswordOpen(!isPasswordOpen);
  };

  async function onSubmit(values: LoginInputs) {
    setError(null);
    return login({ username: values.email, password: values.password })
      .then(() => {
        // Redirect based on user type
        // This will be handled by App.tsx after page reload
        const URL = import.meta.env.VITE_BASE_NAME ? `/${import.meta.env.VITE_BASE_NAME}` : ``;
        window.location.replace(`${URL}`);
      })
      .catch((error) => {
        setError(error);
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to FormLynk
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Streamline your immigration consulting process
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

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                {...register("email", {
                  required: "Email is required."
                })}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
              {errors?.email && <p className="text-red-500 text-xs mt-1">{errors?.email.message}</p>}
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                {...register("password", {
                  required: "Password is required."
                })}
                id="password"
                name="password"
                type={isPasswordOpen ? "text" : "password"}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm pr-10"
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={onClickReveal}
                tabIndex={-1}
              >
                {isPasswordOpen ? (
                  <BiHide className="h-5 w-5 text-gray-400" />
                ) : (
                  <BiShow className="h-5 w-5 text-gray-400" />
                )}
              </button>
              {errors?.password && <p className="text-red-500 text-xs mt-1">{errors.password?.message}</p>}
            </div>
          </div>

          <div className="flex items-center justify-end">
            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </Link>
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
                "Sign in"
              )}
            </button>
            
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Prefer passwordless login?{" "}
              <Link to="/login-with-email" className="font-medium text-blue-600 hover:text-blue-500">
                Login with Email Link
              </Link>
            </p>
          </div>
        </form>

        {loginContext?.message?.social_login && loginContext.message.provider_logins && (
          <>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-50 text-gray-500 uppercase">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {loginContext.message.provider_logins.map((provider, index) => (
                  <a
                    key={index}
                    href={provider.auth_url}
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    {SocialProviderIcons[provider.name] || (
                      <img src={provider.icon.src} alt={provider.icon.alt} className="w-5 h-5" />
                    )}
                    <span className="sr-only">Sign in with {provider.provider_name}</span>
                  </a>
                ))}
              </div>
            </div>
          </>
        )}

        {loginContext?.message?.disable_signup === 0 && (
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                Sign up
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;