import { useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
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
      if (isLogin) {
        // Login
        const response = await authService.login(
          formData.email,
          formData.password
        );
        console.log("Login successful:", response);

        // Navigate to dashboard or home page after successful login
        navigate("/"); // Change to your desired route
      } else {
        // Register
        const userData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        };

        const response = await authService.register(userData);
        console.log("Registration successful:", response);

        // Automatically log in after registration
        await authService.login(formData.email, formData.password);

        // Navigate to dashboard or home page
        navigate("/"); // Change to your desired route
      }
    } catch (err) {
      console.error("Authentication error:", err);
      setError(
        err.message ||
          `${isLogin ? "Login" : "Registration"} failed. Please try again.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: "",
      password: "",
      name: "",
    });
    setError("");
  };

  const handleGoogleLogin = () => {
    // This would typically redirect to your Google OAuth endpoint
    console.log("Google login clicked");
    // Example: window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        {/* Company Logo and Info */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center">
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              SBM
            </span>
            <span className="text-3xl font-medium text-gray-800">Services</span>
          </div>
          <p className="mt-2 text-gray-600">Your Trusted Financial Partner</p>
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-300">
          {/* Header Tabs */}
          <div className="flex">
            <button
              onClick={() => setIsLogin(true)}
              className={`w-1/2 py-4 text-center font-medium text-sm transition-colors duration-300 ${
                isLogin
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`w-1/2 py-4 text-center font-medium text-sm transition-colors duration-300 ${
                !isLogin
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="p-6 sm:p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {isLogin ? "Welcome back!" : "Create an account"}
            </h1>
            <p className="text-gray-600 mb-6 text-sm">
              {isLogin
                ? "Sign in to access your SBM Services account"
                : "Join SBM Services for personalized financial solutions"}
            </p>

            {/* Error message */}
            {error && (
              <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-3">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-400 mt-0.5" />
                  <p className="ml-2 text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name field - only shown on signup */}
              {!isLogin && (
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      required={!isLogin}
                      className="block w-full pl-10 pr-3 py-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}

              {/* Email field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="block w-full pl-10 pr-3 py-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Password field */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  {isLogin && (
                    <a
                      href="#forgot-password"
                      className="text-xs font-medium text-indigo-600 hover:text-indigo-800"
                    >
                      Forgot password?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    minLength={8}
                    className="block w-full pl-10 pr-10 py-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff
                        size={18}
                        className="text-gray-400 hover:text-gray-600"
                      />
                    ) : (
                      <Eye
                        size={18}
                        className="text-gray-400 hover:text-gray-600"
                      />
                    )}
                  </button>
                </div>
                {!isLogin && (
                  <p className="mt-1 text-xs text-gray-500">
                    Password must be at least 8 characters
                  </p>
                )}
              </div>

              {/* Submit button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70"
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
                      {isLogin ? "Signing In..." : "Creating Account..."}
                    </>
                  ) : (
                    <>
                      {isLogin ? "Sign In" : "Create Account"}
                      <ArrowRight size={18} className="ml-2" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="mt-6 pt-5 border-t border-gray-200">
              <div className="relative flex items-center justify-center">
                <span className="absolute px-3 bg-white text-xs text-gray-500 font-medium">
                  Or continue with
                </span>
                <div className="w-full border-t border-gray-300"></div>
              </div>

              {/* Social login buttons */}
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="py-2.5 px-4 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center justify-center"
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M12 5c1.6 0 3 .5 4.1 1.4L19.1 3c-2-1.9-4.7-3-7.1-3S6.9 1.1 4.9 3l3 3.4C9 5.5 10.4 5 12 5z"
                    />
                    <path
                      fill="#34A853"
                      d="M5 12c0-1 .2-1.9.6-2.7L2.6 6C1.5 7.7 1 9.8 1 12s.5 4.3 1.6 6l3-3.4c-.4-.7-.6-1.6-.6-2.6z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M12 19c-1.6 0-3-.6-4.1-1.5l-3 3.4c2 1.9 4.7 3.1 7.1 3.1s5.1-1.2 7.1-3.1l-3-3.4c-1.1.9-2.5 1.5-4.1 1.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M23 12c0-.7-.1-1.3-.2-1.9h-9.6v4h5.5c-.2 1.1-.9 2.1-1.9 2.7l3 3.4c1.7-1.6 2.7-4 2.7-6.8.1-1 0-1 .5-1.4z"
                    />
                  </svg>
                  Google
                </button>
              </div>
            </div>

            {/* Toggle form link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <button
                  type="button"
                  onClick={toggleForm}
                  className="ml-1 font-medium text-indigo-600 hover:text-indigo-800"
                >
                  {isLogin ? "Sign up now" : "Sign in"}
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Company information footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            SBM Services - Providing trusted financial solutions since 2013
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Loans | Financial Planning | Investment Advisory
          </p>
          <p className="text-xs text-gray-500 mt-3">
            © 2025 SBM Services. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
