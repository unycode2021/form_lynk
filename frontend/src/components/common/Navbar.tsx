import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiBell, FiMoon, FiSun, FiSearch, FiHelpCircle } from 'react-icons/fi';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Avatar } from '@radix-ui/themes';
import { useTheme } from '../../ThemeProvider';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const userType = window.formLinkUser?.user_type;
  const username = window.formLinkUser?.user || 'User';
  const { mode, toggleTheme } = useTheme();
  
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-10 transition-colors duration-300">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Menu button and logo */}
          <div className="flex items-center">
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={onMenuClick}
            >
              <span className="sr-only">Open sidebar</span>
              <FiMenu className="h-6 w-6" aria-hidden="true" />
            </button>
            
            <div className="ml-4 md:ml-0 flex items-center">
              <img
                className="h-8 w-auto"
                src="/assets/form_link/images/logo.png"
                alt="Form Link"
                onError={(e) => {
                  e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%232563eb' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'%3E%3C/path%3E%3Cpolyline points='14 2 14 8 20 8'%3E%3C/polyline%3E%3Cline x1='16' y1='13' x2='8' y2='13'%3E%3C/line%3E%3Cline x1='16' y1='17' x2='8' y2='17'%3E%3C/line%3E%3Cpolyline points='10 9 9 9 8 9'%3E%3C/polyline%3E%3C/svg%3E";
                }}
              />
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 hidden sm:inline-block">
                {userType === 'agency' ? 'Agency Portal' : 'Client Portal'}
              </span>
            </div>
          </div>
          
          {/* Center - Search (optional) */}
          <div className="hidden md:flex items-center flex-1 px-2 lg:px-0 lg:ml-6 lg:justify-center">
            <div className="max-w-lg w-full">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                  <FiSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full bg-gray-50 dark:bg-gray-700 border-0 rounded-md py-1.5 pl-10 pr-3 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6 transition-colors"
                  placeholder={`Search ${userType === 'agency' ? 'clients' : 'applications'}...`}
                  type="search"
                />
              </div>
            </div>
          </div>
          
          {/* Right side - Notifications and user menu */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            {/* Help button */}
            <button
              type="button"
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              title="Help & Resources"
            >
              <span className="sr-only">Help & Resources</span>
              <FiHelpCircle className="h-5 w-5" />
            </button>
            
            {/* Notifications */}
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button
                  type="button"
                  className="relative p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  title="Notifications"
                >
                  <span className="sr-only">View notifications</span>
                  <FiBell className="h-5 w-5" aria-hidden="true" />
                  {/* Notification badge */}
                  <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-error-500 ring-2 ring-white dark:ring-gray-800"></span>
                </button>
              </DropdownMenu.Trigger>
              
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="w-80 bg-white dark:bg-gray-800 rounded-md shadow-dropdown border border-gray-200 dark:border-gray-700 p-1 mt-1 z-50"
                  sideOffset={8}
                  align="end"
                >
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Notifications</h3>
                  </div>
                  <div className="py-2 max-h-96 overflow-y-auto">
                    <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                      <div className="border-l-4 border-primary-500 pl-3 py-2">
                        <p className="font-medium">Document Updated</p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">John Smith uploaded a new passport scan</p>
                        <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">30 minutes ago</p>
                      </div>
                    </div>
                    <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                      <div className="border-l-4 border-warning-500 pl-3 py-2">
                        <p className="font-medium">Reminder</p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">Employment verification for Robert Chen is due tomorrow</p>
                        <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2 px-4 border-t border-gray-200 dark:border-gray-700 text-center">
                    <a href="#" className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                      View all notifications
                    </a>
                  </div>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
            
            {/* User dropdown */}
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="ml-2 flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                  <span className="sr-only">Open user menu</span>
                  <Avatar
                    fallback={username.charAt(0).toUpperCase()}
                    color="blue"
                    variant="soft"
                    size="2"
                    className="cursor-pointer"
                  />
                </button>
              </DropdownMenu.Trigger>
              
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="min-w-[220px] bg-white dark:bg-gray-800 rounded-md shadow-dropdown border border-gray-200 dark:border-gray-700 p-1 mt-1 z-50"
                  sideOffset={8}
                  align="end"
                >
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{username}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">view@example.com</div>
                  </div>
                  
                  <DropdownMenu.Item className="text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded px-4 py-2 cursor-pointer flex items-center transition-colors">
                    <Link to="/profile" className="w-full">Your Profile</Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded px-4 py-2 cursor-pointer flex items-center transition-colors">
                    <Link to="/settings" className="w-full">Settings</Link>
                  </DropdownMenu.Item>
                  
                  {userType === 'agency' && (
                    <DropdownMenu.Item className="text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded px-4 py-2 cursor-pointer flex items-center transition-colors">
                      <a href="/app" className="w-full">Desk</a>
                    </DropdownMenu.Item>
                  )}
                  
                  <DropdownMenu.Separator className="h-px bg-gray-200 dark:bg-gray-700 my-1" />
                  
                  <DropdownMenu.Item className="text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded px-4 py-2 cursor-pointer flex items-center transition-colors">
                    <a href="/app/logout" className="w-full">Sign out</a>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
            
            {/* Theme toggle button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {mode === 'dark' ? (
                <FiSun className="h-5 w-5" />
              ) : (
                <FiMoon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;