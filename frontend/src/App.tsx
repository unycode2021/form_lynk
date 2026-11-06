import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { FrappeProvider } from 'frappe-react-sdk'; // Add this import

// Auth pages
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import LoginWithEmail from './pages/auth/LoginWithEmail'; // Add this import

// Agency pages
import AgencyDashboard from './pages/agency/Dashboard';
import ClientManagement from './pages/agency/ClientManagement';
import NewClient from './pages/agency/NewClient';
import QuestionnaireBuilder from './pages/agency/QuestionnaireBuilder';
import DocumentChecklists from './pages/agency/DocumentChecklists';
import ApplicationTypes from './pages/agency/ApplicationTypes';

// Client pages
import ClientDashboard from './pages/client/Dashboard';
import Questionnaire from './pages/client/Questionnaire';
import DocumentUpload from './pages/client/DocumentUpload';
import ApplicationStatus from './pages/client/ApplicationStatus';

// Common components
import Layout from './components/common/Layout';
import NotFound from './pages/NotFound';

const App = () => {
  const [userType, setUserType] = useState<'agency' | 'client' | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  useEffect(() => {
    // Check if user is authenticated and get type
    if (window.formLinkUser) {
      setIsAuthenticated(true);
      if (window.formLinkUser.user_type) {
        setUserType(window.formLinkUser.user_type as 'agency' | 'client');
      }
    }
  }, []);
  
  // Show loading state if we're still checking authentication
  if (isAuthenticated && !userType) {
    return <div>Loading...</div>;
  }
  
  return (
    <FrappeProvider socketPort={window.location.port || "80"}>
      <Routes>
        {/* Auth routes - accessible when not logged in */}
        {!isAuthenticated && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login-with-email" element={<LoginWithEmail />} /> {/* Add this route */}

            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
        
        {/* App routes - accessible when logged in */}
        {isAuthenticated && (
          <Route path="/" element={<Layout />}>
            {/* Agency Routes */}
            {userType === 'agency' && (
              <>
                <Route index element={<AgencyDashboard />} />
                <Route path="clients" element={<ClientManagement />} />
                <Route path="clients/new" element={<NewClient />} />
                <Route path="questionnaires/*" element={<QuestionnaireBuilder />} />
                <Route path="documents/*" element={<DocumentChecklists />} />
                <Route path="application-types/*" element={<ApplicationTypes />} />
              </>
            )}
            
            {/* Client Routes */}
            {userType === 'client' && (
              <>
                <Route index element={<ClientDashboard />} />
                <Route path="questionnaire/:id" element={<Questionnaire />} />
                <Route path="documents/:id" element={<DocumentUpload />} />
                <Route path="status" element={<ApplicationStatus />} />
              </>
            )}
            
            <Route path="*" element={<NotFound />} />
          </Route>
        )}
      </Routes>
    </FrappeProvider>
  );
};

export default App;