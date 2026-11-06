import { Fragment } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { 
  FiHome,
  FiUsers,
  FiFileText,
  FiClipboard,
  FiUser,
  FiFile,
  FiUpload,
  FiBarChart2,
  FiMessageCircle,
  FiSettings,
  FiCalendar
} from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../ThemeProvider';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  userType: string | 'agency' | 'client';
}

const Sidebar = ({ isOpen, setIsOpen, userType }: SidebarProps) => {
  const { mode } = useTheme();
  
  // Enhanced navigation items with categories
  const agencyNavigation = [
    { 
      category: 'Main',
      items: [
        { name: 'Dashboard', href: '/', icon: FiHome },
        { name: 'Clients', href: '/clients', icon: FiUsers },
        { name: 'Calendar', href: '/calendar', icon: FiCalendar },
        { name: 'Messages', href: '/messages', icon: FiMessageCircle },
      ]
    },
    { 
      category: 'Applications',
      items: [
        { name: 'Questionnaires', href: '/questionnaires', icon: FiFileText },
        { name: 'Document Checklists', href: '/documents', icon: FiClipboard },
        { name: 'Application Status', href: '/applications', icon: FiFile },
      ]
    },
    { 
      category: 'Analytics',
      items: [
        { name: 'Reports', href: '/reports', icon: FiBarChart2 },
        { name: 'Settings', href: '/settings', icon: FiSettings },
      ]
    }
  ];
  
  const clientNavigation = [
    { 
      category: 'Main',
      items: [
        { name: 'Dashboard', href: '/', icon: FiHome },
        { name: 'My Profile', href: '/profile', icon: FiUser },
        { name: 'Messages', href: '/messages', icon: FiMessageCircle },
      ]
    },
    { 
      category: 'Application',
      items: [
        { name: 'Questionnaires', href: '/questionnaire', icon: FiFileText },
        { name: 'Documents', href: '/documents', icon: FiUpload },
        { name: 'Application Status', href: '/status', icon: FiFile },
      ]
    }
  ];
  
  const navigation = userType === 'agency' ? agencyNavigation : clientNavigation;

  return (
    <>
      {/* Mobile sidebar - dialog/modal */}
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-gray-600/75 dark:bg-gray-900/80 backdrop-blur-sm z-40 transition-opacity md:hidden" />
          <Dialog.Content className="fixed inset-y-0 left-0 max-w-xs w-full bg-white dark:bg-gray-800 shadow-xl z-50 transition-transform animate-slide-up md:hidden">
            <div className="flex flex-col h-full">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <Cross2Icon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
              
              <div className="flex flex-shrink-0 items-center px-6 pt-6 pb-4">
                <img
                  className="h-8 w-auto"
                  src="/assets/form_link/images/logo.png"
                  alt="Form Link"
                  onError={(e) => {
                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%232563eb' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'%3E%3C/path%3E%3Cpolyline points='14 2 14 8 20 8'%3E%3C/polyline%3E%3Cline x1='16' y1='13' x2='8' y2='13'%3E%3C/line%3E%3Cline x1='16' y1='17' x2='8' y2='17'%3E%3C/line%3E%3Cpolyline points='10 9 9 9 8 9'%3E%3C/polyline%3E%3C/svg%3E";
                  }}
                />
                <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white font-display">
                  Form<span className="text-primary-600 dark:text-primary-400">Link</span>
                </span>
              </div>
              
              <div className="flex-1 overflow-y-auto px-4 py-2">
                <nav className="space-y-6">
                  {navigation.map((group) => (
                    <div key={group.category}>
                      <p className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {group.category}
                      </p>
                      <div className="mt-2 space-y-1">
                        {group.items.map((item) => (
                          <NavLink
                            key={item.name}
                            to={item.href}
                            className={({ isActive }) =>
                              `group flex items-center px-3 py-2.5 text-base font-medium rounded-lg transition-all ${
                                isActive
                                  ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-100'
                                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                              }`
                            }
                            onClick={() => setIsOpen(false)}
                          >
                            <item.icon
                              className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors ${
                                ({ isActive }: { isActive: boolean }) => isActive 
                                  ? 'text-primary-600 dark:text-primary-400' 
                                  : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                              }`}
                              aria-hidden="true"
                            />
                            {item.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  ))}
                </nav>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Static sidebar for desktop - shown directly in the layout */}
      <div className="h-full flex flex-col border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="flex flex-shrink-0 items-center px-6 h-16">
          <img
            className="h-8 w-auto"
            src="/assets/form_link/images/logo.png"
            alt="Form Link"
            onError={(e) => {
              e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%232563eb' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'%3E%3C/path%3E%3Cpolyline points='14 2 14 8 20 8'%3E%3C/polyline%3E%3Cline x1='16' y1='13' x2='8' y2='13'%3E%3C/line%3E%3Cline x1='16' y1='17' x2='8' y2='17'%3E%3C/line%3E%3Cpolyline points='10 9 9 9 8 9'%3E%3C/polyline%3E%3C/svg%3E";
            }}
          />
          <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-white font-display">
            Form<span className="text-primary-600 dark:text-primary-400">Link</span>
          </span>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <nav className="space-y-6">
            {navigation.map((group) => (
              <div key={group.category}>
                <p className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {group.category}
                </p>
                <div className="mt-2 space-y-1">
                  {group.items.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) =>
                        `group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                          isActive
                            ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-100'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                        }`
                      }
                    >
                      <item.icon
                        className="mr-3 h-5 w-5 flex-shrink-0 transition-colors text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        aria-hidden="true"
                      />
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
        
        {/* Bottom section with app info */}
        <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            <p>Form Link {userType === 'agency' ? 'Agency Portal' : 'Client Portal'}</p>
            <p className="mt-1">Version 1.0.0</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;