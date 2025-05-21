import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Shield,
  AlertCircle,
  LogIn,
} from "lucide-react";
import axios from "axios"; // Make sure to install axios: npm install axios

export default function AdminLogin({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing again
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Connect to backend API for authentication
      const response = await axios.post(
        "http://localhost:3000/api/admin/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      // If authentication is successful, store token
      if (response.data && response.data.token) {
        localStorage.setItem("adminToken", response.data.token);

        // Store additional admin info if needed
        if (response.data.admin) {
          localStorage.setItem(
            "adminInfo",
            JSON.stringify({
              id: response.data.admin._id,
              name: response.data.admin.name,
              email: response.data.admin.email,
            })
          );
        }

        setIsAuthenticated(true);
        navigate("/admin/dashboard");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      console.error("Authentication error:", err);

      // Handle specific error messages from backend
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError(
          "Authentication failed. Please check your credentials and try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and admin panel indicator */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center">
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
              SBM
            </span>
            <span className="text-3xl font-medium text-white">Services</span>
          </div>
          <div className="mt-2 flex items-center justify-center space-x-2">
            <Shield size={16} className="text-blue-300" />
            <p className="text-blue-200 font-medium">Admin Control Panel</p>
          </div>
        </div>

        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-white border-opacity-20">
          <div className="p-8">
            <h1 className="text-2xl font-bold text-black text-center mb-2">
              Administrator Login
            </h1>

            {/* Error message */}
            {error && (
              <div className="mb-6 bg-red-900 bg-opacity-30 border-l-4 border-red-500 p-4 rounded">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <p className="ml-3 text-sm text-red-300">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-blue-400 mb-1"
                >
                  Admin Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-blue-300" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="block w-full pl-10 pr-3 py-3 text-gray-800 bg-white bg-opacity-90 border border-blue-400 border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 placeholder-opacity-70"
                    placeholder="admin@sbmservices.com"
                  />
                </div>
              </div>

              {/* Password field */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-blue-400"
                  >
                    Password
                  </label>
                  <a
                    href="#forgot-password"
                    className="text-xs font-medium text-blue-300 hover:text-blue-200"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-blue-300" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="block w-full pl-10 pr-10 py-3 text-gray-800 bg-white bg-opacity-90 border border-blue-400 border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 placeholder-opacity-70"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-300 hover:text-blue-100"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Authenticating...
                    </>
                  ) : (
                    <>
                      Access Dashboard
                      <LogIn size={18} className="ml-2" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Security notice */}
            <div className="mt-8">
              <div className="p-4 rounded-lg bg-blue-900 bg-opacity-20 border border-blue-400 border-opacity-20">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Shield className="h-5 w-5 text-blue-300" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-200">
                      Security Notice
                    </h3>
                    <div className="mt-2 text-sm text-blue-300">
                      <p>
                        This is a secure area. Your login attempt and IP address
                        are being monitored.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-blue-300">
            SBM Services Administration © {new Date().getFullYear()}
          </p>
          <p className="text-xs text-blue-400 mt-1">All rights reserved</p>
        </div>
      </div>
    </div>
  );
}
