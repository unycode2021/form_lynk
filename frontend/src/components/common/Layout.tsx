import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';
import { useTheme } from '../../ThemeProvider';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userType = window.formLinkUser?.user_type;
  const { mode } = useTheme();
  
  // Add smooth transition when theme changes
  useEffect(() => {
    document.documentElement.classList.add('transition-colors');
    document.documentElement.classList.add('duration-300');
    
    return () => {
      document.documentElement.classList.remove('transition-colors');
      document.documentElement.classList.remove('duration-300');
    };
  }, []);
  
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="w-64 flex flex-col">
          {/* Sidebar component for desktop */}
          <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} userType={userType} />
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        
        {/* Main scrollable area */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="animate-fade-in">
              <Outlet />
            </div>
            
            {/* Footer */}
            <footer className="mt-8">
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  © {new Date().getFullYear()} Form Link. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div> 
  );
};

export default Layout;