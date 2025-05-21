import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import AdminLogin from "./Pages/AdminLogin";
import Dashboard from "./Pages/Dashboard";
// import LoanApplications from "./Pages/LoanApplications";
import ApplicationDetail from "./Pages/ApplicationDetail";
import Applications from "./Pages/Applications";
// import Users from "./Pages/Users";
// import Settings from "./Pages/Settings";
import NotFound from "./Pages/NotFound";

function App() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("adminToken");
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return <Navigate to="/admin/login" replace />;
    }

    return children;
  };

  // Public route component (accessible only when NOT logged in)
  const PublicRoute = ({ children }) => {
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (isAuthenticated) {
      return <Navigate to="/admin/dashboard" replace />;
    }

    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route
          path="/admin/login"
          element={
            <PublicRoute>
              <AdminLogin setIsAuthenticated={setIsAuthenticated} />
            </PublicRoute>
          }
        />

        {/* Protected routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/applications/:id"
          element={
            <ProtectedRoute>
              <ApplicationDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/applications"
          element={
            <ProtectedRoute>
              <Applications />
            </ProtectedRoute>
          }
        />
        {/* 
       
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        /> */}

        {/* Default routes */}
        <Route
          path="/admin"
          element={<Navigate to="/admin/dashboard" replace />}
        />
        <Route path="/" element={<Navigate to="/admin/login" replace />} />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
