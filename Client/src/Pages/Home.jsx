import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiHome,
  FiDollarSign,
  FiBriefcase,
  FiStar,
  FiShield,
  FiClock,
  FiSmile,
  FiArrowRight,
  FiChevronDown,
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { authService } from "../services/api";

const Home = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const checkUserAuth = async () => {
      if (authService.isAuthenticated()) {
        try {
          // Get user from localStorage or API
          const token = localStorage.getItem("token");
          if (token) {
            const userInfo = JSON.parse(localStorage.getItem("user"));
            setUser(userInfo);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    checkUserAuth();

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate("/login");
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const testimonials = [
    {
      text: "SBM Services made the business loan process incredibly simple. Their team understood my requirements and offered a solution that perfectly fit my needs. The quick approval helped me seize a time-sensitive business opportunity.",
      name: "Rahul Sharma",
    },
    {
      text: "Getting my home loan through SBM Services was the best decision. Their competitive interest rates saved me lakhs of rupees compared to other lenders. Their staff was extremely supportive throughout the process.",
      name: "Priya Patel",
    },
    {
      text: "I needed a personal loan urgently for a family medical emergency. SBM Services not only approved my loan in record time but also offered me very reasonable terms. Their customer service is exceptional.",
      name: "Vikram Mehta",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-blue-50 to-white">
      {/* Background pattern overlay */}
      <div className="fixed inset-0 z-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234f46e5' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        ></div>
      </div>

      {/* Navigation bar */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrollPosition > 50
            ? "bg-white/95 backdrop-blur-md shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  SBM
                </span>
                <span className="text-xl font-medium text-gray-800">
                  Services
                </span>
              </Link>
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                About
              </Link>
              <Link
                to="/services"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Services
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Contact
              </Link>

              {/* Show either login button or user profile */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors focus:outline-none"
                  >
                    <span className="p-1 bg-blue-100 rounded-full">
                      <FiUser className="text-blue-600" />
                    </span>
                    <span>{user.name}</span>
                    <FiChevronDown
                      className={`transform transition-transform ${
                        isUserMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/applications"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                      >
                        My Applications
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 flex items-center"
                      >
                        <FiLogOut className="mr-2" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
                >
                  <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                  <span className="relative">Login</span>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                {isMenuOpen ? (
                  <FiX className="h-6 w-6" />
                ) : (
                  <FiMenu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md shadow-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              >
                About
              </Link>
              <Link
                to="/services"
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              >
                Services
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              >
                Contact
              </Link>

              {user ? (
                <>
                  <div className="px-3 py-2 text-gray-700 font-medium border-t border-gray-100 mt-2 pt-2">
                    <div className="flex items-center space-x-2">
                      <span className="p-1 bg-blue-100 rounded-full">
                        <FiUser className="text-blue-600" />
                      </span>
                      <span>{user.name}</span>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 pl-8"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/applications"
                    className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 pl-8"
                  >
                    My Applications
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 pl-8 flex items-center"
                  >
                    <FiLogOut className="mr-2" /> Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero section with enhanced visual elements */}
      <section className="relative pt-20 lg:pt-28">
        <div className="absolute inset-0 z-0">
          <svg
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 900"
          >
            <path
              fill="#f0f4ff"
              fillOpacity="1"
              d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
            <path
              fill="#e0e7ff"
              fillOpacity="1"
              d="M0,352L48,330.7C96,309,192,267,288,256C384,245,480,267,576,282.7C672,299,768,309,864,282.7C960,256,1056,192,1152,176C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              transform="translate(0, 150)"
            ></path>
            <path
              fill="#c7d2fe"
              fillOpacity="0.7"
              d="M0,416L48,400C96,384,192,352,288,336C384,320,480,320,576,336C672,352,768,384,864,384C960,384,1056,352,1152,341.3C1248,331,1344,341,1392,346.7L1440,352L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              transform="translate(0, 300)"
            ></path>
          </svg>
          <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-gradient-to-br from-amber-100 to-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2 pt-10 pb-16 lg:pr-10">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <motion.span
                  variants={fadeInUp}
                  className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-5 shadow-sm bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-indigo-900 border border-blue-200"
                >
                  Financial Solutions For Everyone
                </motion.span>
                <motion.h1
                  variants={fadeInUp}
                  className="text-4xl sm:text-5xl font-bold mb-5"
                >
                  <span className="text-gray-900">Simple, Transparent</span>{" "}
                  <br className="hidden lg:block" />
                  <span className="bg-gradient-to-br from-indigo-700 via-blue-600 to-purple-700 bg-clip-text text-transparent drop-shadow-sm">
                    Loan Solutions
                  </span>
                </motion.h1>
                <motion.p
                  variants={fadeInUp}
                  className="text-lg text-gray-600 mb-8 max-w-xl"
                >
                  SBM Services offers flexible loan options to meet your
                  personal and business financial needs with quick approval and
                  competitive rates.
                </motion.p>
                <motion.div
                  variants={fadeInUp}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link
                    to="/loan"
                    className="group relative px-8 py-3 bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:via-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 transform duration-200 font-medium flex items-center justify-center overflow-hidden"
                  >
                    <span className="absolute right-0 top-0 h-full w-12 translate-x-12 transform bg-white/20 block skew-x-12 transition-all duration-500 group-hover:-translate-x-full ease-out"></span>
                    <span className="relative">Apply for Loan</span>
                    <FiArrowRight className="ml-2 relative" />
                  </Link>
                  <Link
                    to="/calculator"
                    className="px-8 py-3 bg-white border border-indigo-100 text-gray-700 rounded-lg hover:bg-indigo-50 transition-colors font-medium flex items-center justify-center shadow-md hover:shadow-lg hover:-translate-y-0.5 transform duration-200"
                  >
                    Loan Calculator
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-1/2"
            >
              <div className="relative">
                {/* Animated rotating glow effect */}
                <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 opacity-30 blur-xl animate-pulse"></div>
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 opacity-20 blur transform rotate-3 animate-tilt"></div>
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 opacity-20 blur transform -rotate-3 animate-tilt"></div>

                <img
                  src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Financial planning"
                  className="relative rounded-xl shadow-2xl w-full h-auto object-cover z-10"
                />

                {/* Decorative elements */}
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full opacity-40 blur-sm"></div>
                <div className="absolute -left-6 -top-6 w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full opacity-40 blur-sm"></div>
              </div>
            </motion.div>
          </div>

          {/* Stats cards with enhanced styling */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 mb-20"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
              <div className="relative bg-gradient-to-br from-white to-indigo-50 p-6 rounded-xl shadow-lg hover:shadow-xl border-t border-l border-white/50 backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-500">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-600 text-white flex items-center justify-center mb-4">
                  <span className="text-xl font-bold">10+</span>
                </div>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-bold text-3xl">
                  Years
                </div>
                <div className="text-gray-600 mt-0">of Experience</div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
              <div className="relative bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-lg hover:shadow-xl border-t border-l border-white/50 backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-500">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center mb-4">
                  <span className="text-xl font-bold">₹</span>
                </div>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-bold text-3xl">
                  50Cr+
                </div>
                <div className="text-gray-600 mt-0">Loans Disbursed</div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
              <div className="relative bg-gradient-to-br from-white to-purple-50 p-6 rounded-xl shadow-lg hover:shadow-xl border-t border-l border-white/50 backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-500">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 text-white flex items-center justify-center mb-4">
                  <span className="text-xl font-bold">5k+</span>
                </div>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-bold text-3xl">
                  Clients
                </div>
                <div className="text-gray-600 mt-0">Happy Customers</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About section with glass morphism */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute w-full h-full inset-0 bg-gradient-to-b from-white via-indigo-50 to-blue-50 -z-10"></div>

        {/* Glass panels decoration */}
        <div className="absolute left-0 top-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-1/4 -left-10 w-40 h-40 bg-purple-400/20 rounded-3xl rotate-12 backdrop-blur-xl"></div>
          <div className="absolute bottom-1/3 -right-10 w-60 h-60 bg-blue-400/20 rounded-3xl -rotate-12 backdrop-blur-xl"></div>
          <div className="absolute top-2/3 left-1/4 w-28 h-28 bg-indigo-400/20 rounded-2xl rotate-45 backdrop-blur-xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-br from-indigo-700 via-blue-700 to-purple-700 bg-clip-text text-transparent inline-block">
              About SBM Services
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <div className="relative">
                {/* Image decorative element */}
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-30 blur-xl transform rotate-6"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl backdrop-blur-sm transform -rotate-3"></div>
                <img
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Team meeting"
                  className="relative rounded-2xl shadow-2xl w-full transform rotate-3 z-10"
                />

                {/* Confetti decorations */}
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-blue-200 rounded-full mix-blend-multiply opacity-70 animate-float"></div>
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-purple-200 rounded-full mix-blend-multiply opacity-70 animate-float-delay"></div>
                <div className="absolute top-1/3 -right-6 w-12 h-12 bg-pink-200 rounded-full mix-blend-multiply opacity-70 animate-float-slow"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <div className="relative p-6 bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl opacity-70 -z-10"></div>
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-700 to-blue-700 mb-4">
                  Your Trusted Financial Partner
                </h3>
                <p className="text-gray-700 mb-6">
                  Founded in 2013, SBM Services has been committed to providing
                  accessible and affordable loan solutions to individuals and
                  businesses across India. Our mission is to simplify the
                  lending process and create financial opportunities for
                  everyone.
                </p>
                <p className="text-gray-700 mb-6">
                  With a team of experienced financial experts, we strive to
                  understand your unique needs and offer customized loan
                  products that align with your financial goals. We believe in
                  transparency, integrity, and building lasting relationships
                  with our clients.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-100 to-indigo-50 border border-indigo-200 shadow-sm">
                    <FiShield className="text-indigo-600 mr-2" />
                    <span className="text-gray-700">Licensed & Regulated</span>
                  </div>
                  <div className="flex items-center px-4 py-3 rounded-lg bg-gradient-to-r from-blue-100 to-blue-50 border border-blue-200 shadow-sm">
                    <FiClock className="text-blue-600 mr-2" />
                    <span className="text-gray-700">Quick Processing</span>
                  </div>
                  <div className="flex items-center px-4 py-3 rounded-lg bg-gradient-to-r from-purple-100 to-purple-50 border border-purple-200 shadow-sm">
                    <FiDollarSign className="text-purple-600 mr-2" />
                    <span className="text-gray-700">Competitive Rates</span>
                  </div>
                  <div className="flex items-center px-4 py-3 rounded-lg bg-gradient-to-r from-pink-100 to-pink-50 border border-pink-200 shadow-sm">
                    <FiSmile className="text-pink-600 mr-2" />
                    <span className="text-gray-700">Customer Satisfaction</span>
                  </div>
                </div>
                <Link
                  to="/about"
                  className="inline-flex items-center text-white mt-6 px-6 py-2 rounded-lg bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 hover:from-indigo-700 hover:via-blue-700 hover:to-purple-700 shadow-md transition-all duration-300"
                >
                  Learn more about us
                  <FiArrowRight className="ml-2" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Loan types section with glassmorphic cards */}
      <section className="py-16 relative bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Decorative patterns */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSIxNDQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+ICAgIDxwYXRoIGQ9Ik0wIDEyOS4wNDlDMTk3LjU5Mi0yNCAxNDcyLjcyLTE4OC4yMzQgMTQ0MCAxMjkuMDQ5djIyLjI4Nkgwdi0yMi4yODZ6IiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9IjAuMjUiLz48L3N2Zz4=')]"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSIxNDQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+ICAgIDxwYXRoIGQ9Ik0wIDE0NEMxOTcuNTkyIDAgMTQ3Mi43MiAwIDE0NDAgMHYxNDRIMHoiIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgb3BhY2l0eT0iMC4yNSIvPjwvc3ZnPg==')]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-br from-indigo-700 via-blue-700 to-purple-700 bg-clip-text text-transparent inline-block">
              Our Loan Products
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              We offer a variety of loan options designed to meet your specific
              needs with flexible terms and competitive interest rates.
            </p>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mt-4 rounded-full"></div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          >
            {/* Home Loan Card */}
            <motion.div variants={fadeInUp} className="group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl opacity-50 group-hover:opacity-70 blur transition duration-200"></div>
                <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSIyNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+ICAgIDxwYXRoIGQ9Ik0wIDBDMTk3LjU5MiAxNTUuNzU1IDE0NzIuNzIgMTU1Ljc1NSAxNDQwIDBIMFoiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')] bg-bottom bg-no-repeat"></div>
                    <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-blue-700 to-transparent opacity-60"></div>
                    <FiHome className="absolute inset-0 m-auto text-white h-16 w-16 opacity-75" />
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-xl font-bold text-white drop-shadow-md">
                        Home Loans
                      </h3>
                      <div className="flex mt-1">
                        <span className="text-blue-100 text-xs rounded-full bg-white/20 px-2 py-0.5">
                          From 8.5% p.a.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">
                      Make your dream home a reality with our competitive home
                      loan options featuring low interest rates and flexible
                      repayment terms.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-600 text-sm">
                          Up to ₹5 crore loan amount
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-600 text-sm">
                          Interest rates starting at 8.50% p.a.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-600 text-sm">
                          Tenure up to 30 years
                        </span>
                      </li>
                    </ul>
                    <Link
                      to="/loans/home"
                      className="inline-block w-full py-3 text-center bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Personal Loan Card */}
            <motion.div variants={fadeInUp} className="group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-2xl opacity-50 group-hover:opacity-70 blur transition duration-200"></div>
                <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                  <div className="h-48 bg-gradient-to-br from-indigo-500 to-indigo-700 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSIyNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+ICAgIDxwYXRoIGQ9Ik0wIDBDMTk3LjU5MiAxNTUuNzU1IDE0NzIuNzIgMTU1Ljc1NSAxNDQwIDBIMFoiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')] bg-bottom bg-no-repeat"></div>
                    <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-indigo-700 to-transparent opacity-60"></div>
                    <FiDollarSign className="absolute inset-0 m-auto text-white h-16 w-16 opacity-75" />
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-xl font-bold text-white drop-shadow-md">
                        Personal Loans
                      </h3>
                      <div className="flex mt-1">
                        <span className="text-indigo-100 text-xs rounded-full bg-white/20 px-2 py-0.5">
                          From 10.5% p.a.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">
                      Get quick access to funds for your personal needs, whether
                      it's travel, education, medical expenses, or debt
                      consolidation.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <span className="text-indigo-600 mr-2">•</span>
                        <span className="text-gray-600 text-sm">
                          Up to ₹25 lakhs loan amount
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-600 mr-2">•</span>
                        <span className="text-gray-600 text-sm">
                          Interest rates starting at 10.50% p.a.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-600 mr-2">•</span>
                        <span className="text-gray-600 text-sm">
                          Minimal documentation, quick approval
                        </span>
                      </li>
                    </ul>
                    <Link
                      to="/loans/personal"
                      className="inline-block w-full py-3 text-center bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-lg hover:from-indigo-600 hover:to-indigo-800 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Business Loan Card */}
            <motion.div variants={fadeInUp} className="group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-purple-400 rounded-2xl opacity-50 group-hover:opacity-70 blur transition duration-200"></div>
                <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                  <div className="h-48 bg-gradient-to-br from-purple-500 to-purple-700 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSIyNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+ICAgIDxwYXRoIGQ9Ik0wIDBDMTk3LjU5MiAxNTUuNzU1IDE0NzIuNzIgMTU1Ljc1NSAxNDQwIDBIMFoiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')] bg-bottom bg-no-repeat"></div>
                    <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-purple-700 to-transparent opacity-60"></div>
                    <FiBriefcase className="absolute inset-0 m-auto text-white h-16 w-16 opacity-75" />
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-xl font-bold text-white drop-shadow-md">
                        Business Loans
                      </h3>
                      <div className="flex mt-1">
                        <span className="text-purple-100 text-xs rounded-full bg-white/20 px-2 py-0.5">
                          From 11.0% p.a.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">
                      Fuel your business growth with our flexible business
                      financing solutions, designed for both startups and
                      established enterprises.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        <span className="text-gray-600 text-sm">
                          Up to ₹2 crore loan amount
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        <span className="text-gray-600 text-sm">
                          Interest rates starting at 11.00% p.a.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        <span className="text-gray-600 text-sm">
                          Collateral & collateral-free options
                        </span>
                      </li>
                    </ul>
                    <Link
                      to="/loans/business"
                      className="inline-block w-full py-3 text-center bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg hover:from-purple-600 hover:to-purple-800 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="text-center mt-12">
            <Link
              to="/loans"
              className="group relative inline-flex items-center px-6 py-3 overflow-hidden rounded-lg bg-white text-indigo-600 shadow-md transition-all duration-500"
            >
              <span className="absolute left-0 top-0 h-0 w-0 bg-gradient-to-r from-indigo-600 to-blue-600 transition-all duration-500 ease-out group-hover:h-full group-hover:w-full"></span>
              <span className="relative group-hover:text-white transition-colors duration-300 ease-out">
                View All Loan Products
              </span>
              <FiArrowRight className="ml-2 relative group-hover:text-white transition-colors duration-300 ease-out group-hover:translate-x-1 transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features section with enhanced card design */}
      <section className="py-16 relative bg-gradient-to-b from-white via-indigo-50 to-white overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNDQwIDMyMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PHBhdGggZmlsbD0iI2YwZjdmZiIgZD0iTTAgMHYxNDRzMzQ4LjUtNzQgNzIwLTc0IDcyMCA3NCA3MjAgNzRWMEgweiI+PC9wYXRoPjwvc3ZnPg==')] bg-no-repeat -z-10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 transform rotate-180 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNDQwIDMyMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PHBhdGggZmlsbD0iI2YwZjdmZiIgZD0iTTAgMHYxNDRzMzQ4LjUtNzQgNzIwLTc0IDcyMCA3NCA3MjAgNzRWMEgweiI+PC9wYXRoPjwvc3ZnPg==')] bg-no-repeat -z-10"></div>

        {/* Floating shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply opacity-30 animate-float-slow"></div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply opacity-30 animate-float"></div>
          <div className="absolute top-1/2 left-1/3 w-60 h-60 bg-purple-100 rounded-full mix-blend-multiply opacity-20 animate-float-delay"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-br from-indigo-700 via-blue-700 to-purple-700 bg-clip-text text-transparent inline-block">
              Why Choose SBM Services
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group"
            >
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-white/80 to-indigo-50/80 backdrop-blur-sm shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-2xl -z-10"></div>
                <div className="w-16 h-16 mb-6 relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 animate-pulse opacity-25"></div>
                  <div className="absolute inset-1 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white">
                    <FiClock className="h-7 w-7" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700 mb-3">
                  Quick Approval
                </h3>
                <p className="text-gray-600">
                  Our streamlined process ensures quick loan approvals, with
                  funds disbursed in as little as 48 hours.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group"
            >
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-white/80 to-blue-50/80 backdrop-blur-sm shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 rounded-2xl -z-10"></div>
                <div className="w-16 h-16 mb-6 relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 animate-pulse opacity-25"></div>
                  <div className="absolute inset-1 rounded-full bg-gradient-to-br from-indigo-400 to-blue-600 flex items-center justify-center text-white">
                    <FiShield className="h-7 w-7" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-blue-700 mb-3">
                  Transparent Process
                </h3>
                <p className="text-gray-600">
                  No hidden charges or fees. We believe in complete transparency
                  throughout your loan journey.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group"
            >
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-white/80 to-purple-50/80 backdrop-blur-sm shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 rounded-2xl -z-10"></div>
                <div className="w-16 h-16 mb-6 relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 animate-pulse opacity-25"></div>
                  <div className="absolute inset-1 rounded-full bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center text-white">
                    <FiStar className="h-7 w-7" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-700 mb-3">
                  Competitive Rates
                </h3>
                <p className="text-gray-600">
                  We offer industry-leading interest rates to ensure
                  affordability and maximize your savings.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group"
            >
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-white/80 to-teal-50/80 backdrop-blur-sm shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-500/5 rounded-2xl -z-10"></div>
                <div className="w-16 h-16 mb-6 relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-600 to-blue-600 animate-pulse opacity-25"></div>
                  <div className="absolute inset-1 rounded-full bg-gradient-to-br from-teal-400 to-blue-600 flex items-center justify-center text-white">
                    <svg
                      className="h-7 w-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-blue-700 mb-3">
                  Flexible Terms
                </h3>
                <p className="text-gray-600">
                  Customize your loan with flexible repayment terms that fit
                  your financial situation and goals.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="group"
            >
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-white/80 to-amber-50/80 backdrop-blur-sm shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-2xl -z-10"></div>
                <div className="w-16 h-16 mb-6 relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-600 to-orange-600 animate-pulse opacity-25"></div>
                  <div className="absolute inset-1 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-white">
                    <svg
                      className="h-7 w-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-orange-700 mb-3">
                  Dedicated Support
                </h3>
                <p className="text-gray-600">
                  Our dedicated relationship managers provide personalized
                  guidance throughout your loan journey.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="group"
            >
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-white/80 to-pink-50/80 backdrop-blur-sm shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 rounded-2xl -z-10"></div>
                <div className="w-16 h-16 mb-6 relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-600 to-purple-600 animate-pulse opacity-25"></div>
                  <div className="absolute inset-1 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center text-white">
                    <svg
                      className="h-7 w-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-700 to-purple-700 mb-3">
                  Minimal Documentation
                </h3>
                <p className="text-gray-600">
                  We've simplified our documentation requirements to make the
                  application process hassle-free.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials with aurora effect */}
      {/* Testimonials */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">What Our Clients Say</h2>
            <div className="h-1 w-20 bg-white mx-auto mt-4"></div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div
              variants={fadeInUp}
              className="bg-blue-800 bg-opacity-50 p-6 rounded-xl"
            >
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold">
                  R
                </div>
                <div className="ml-4">
                  <div className="font-medium">Rahul Sharma</div>
                  <div className="text-blue-200 text-sm">Business Owner</div>
                </div>
              </div>
              <p className="text-blue-100">
                "SBM Services made the business loan process incredibly simple.
                Their team understood my requirements and offered a solution
                that perfectly fit my needs. The quick approval helped me seize
                a time-sensitive business opportunity."
              </p>
              <div className="flex mt-4 text-yellow-400">
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-blue-800 bg-opacity-50 p-6 rounded-xl"
            >
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold">
                  P
                </div>
                <div className="ml-4">
                  <div className="font-medium">Priya Patel</div>
                  <div className="text-blue-200 text-sm">Home Owner</div>
                </div>
              </div>
              <p className="text-blue-100">
                "Getting my home loan through SBM Services was the best
                decision. Their competitive interest rates saved me lakhs of
                rupees compared to other lenders. Their staff was extremely
                supportive throughout the process."
              </p>
              <div className="flex mt-4 text-yellow-400">
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-blue-800 bg-opacity-50 p-6 rounded-xl"
            >
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold">
                  V
                </div>
                <div className="ml-4">
                  <div className="font-medium">Vikram Mehta</div>
                  <div className="text-blue-200 text-sm">IT Professional</div>
                </div>
              </div>
              <p className="text-blue-100">
                "I needed a personal loan urgently for a family medical
                emergency. SBM Services not only approved my loan in record time
                but also offered me very reasonable terms. Their customer
                service is exceptional."
              </p>
              <div className="flex mt-4 text-yellow-400">
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ section with improved accordions */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent inline-block">
              Frequently Asked Questions
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "What documents do I need to apply for a loan?",
                answer:
                  "The basic documents required include identity proof (Aadhaar, PAN), address proof, income proof (salary slips or bank statements), and photographs. Specific loan types may require additional documents like property papers for secured loans.",
                bgColor: "bg-blue-100",
                textColor: "text-blue-700",
                iconColor: "text-blue-600",
              },
              {
                question: "What is the typical loan approval time?",
                answer:
                  "Our loan approval process typically takes 1-3 business days for personal loans and up to 7 business days for home and business loans, depending on documentation completeness and verification requirements.",
                bgColor: "bg-indigo-100",
                textColor: "text-indigo-700",
                iconColor: "text-indigo-600",
              },
              {
                question: "Are there any prepayment penalties?",
                answer:
                  "We offer flexible prepayment options. For personal loans, a nominal prepayment fee of 2-4% may apply if closed within 12 months. Home loans have no prepayment charges for floating rate loans. Business loan prepayment terms vary based on loan structure.",
                bgColor: "bg-purple-100",
                textColor: "text-purple-700",
                iconColor: "text-purple-600",
              },
              {
                question: "What interest rates do you offer?",
                answer:
                  "Our interest rates are competitive and based on various factors including loan type, amount, term, and your credit profile. Personal loans range from 10.5% to 18%, home loans from 8.5% to 11%, and business loans from 11% to 16% per annum.",
                bgColor: "bg-teal-100",
                textColor: "text-teal-700",
                iconColor: "text-teal-600",
              },
              {
                question: "How do I check my loan application status?",
                answer:
                  "You can check your application status by logging into our customer portal, contacting your relationship manager, or calling our customer service helpline at 1800-123-4567.",
                bgColor: "bg-amber-100",
                textColor: "text-amber-700",
                iconColor: "text-amber-600",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-md transition-all duration-300 hover:shadow-lg"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => toggleAccordion(index)}
                >
                  <span className={`font-medium ${faq.textColor}`}>
                    {faq.question}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full ${
                      faq.bgColor
                    } flex items-center justify-center transition-transform duration-300 ${
                      activeAccordion === index ? "transform rotate-180" : ""
                    }`}
                  >
                    <FiChevronDown className={`${faq.iconColor} text-sm`} />
                  </div>
                </button>
                <div
                  className={`px-6 overflow-hidden transition-all duration-500 ${
                    activeAccordion === index ? "max-h-40 pb-4" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-600">Still have questions?</p>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 mt-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Contact Us
              <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA section with improved design */}
      <section className="py-16 bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 text-white relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute inset-0">
          <svg
            className="absolute bottom-0 left-0 w-full"
            viewBox="0 0 1440 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,224L80,229.3C160,235,320,245,480,224C640,203,800,149,960,138.7C1120,128,1280,160,1360,176L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
              fill="rgba(255, 255, 255, 0.1)"
            ></path>
          </svg>
          <svg
            className="absolute bottom-0 left-0 w-full"
            viewBox="0 0 1440 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,288L60,266.7C120,245,240,203,360,197.3C480,192,600,224,720,229.3C840,235,960,213,1080,218.7C1200,224,1320,256,1380,272L1440,288L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
              fill="rgba(255, 255, 255, 0.05)"
            ></path>
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-4"
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-blue-100 mb-8 max-w-2xl mx-auto"
          >
            Take the first step towards your financial goals today. Our team is
            ready to help you find the perfect loan solution.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              to="/loan"
              className="px-8 py-3 bg-white text-indigo-700 rounded-lg hover:bg-blue-50 transition-colors font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-300"
            >
              Apply Now
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 bg-white/10 border border-white/30 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-300"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer with enhanced design */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <Link to="/" className="flex items-center">
                <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                  SBM
                </span>
                <span className="text-xl font-medium text-gray-300">
                  Services
                </span>
              </Link>
              <p className="mt-4 text-gray-400">
                Providing trusted financial solutions since 2013. We're
                committed to making your financial dreams a reality.
              </p>
              <div className="flex mt-6 space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-sky-600 hover:text-white transition-all duration-300"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-700 hover:text-white transition-all duration-300"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Our Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/loans/home"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    Home Loans
                  </Link>
                </li>
                <li>
                  <Link
                    to="/loans/personal"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    Personal Loans
                  </Link>
                </li>
                <li>
                  <Link
                    to="/loans/business"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    Business Loans
                  </Link>
                </li>
                <li>
                  <Link
                    to="/loans/education"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    Education Loans
                  </Link>
                </li>
                <li>
                  <Link
                    to="/loans/property"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    Loan Against Property
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/about"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/calculator"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    EMI Calculator
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    Blog & Updates
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-gray-400 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-gray-400">
                    123 Finance Street, Mumbai, Maharashtra 400001
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-gray-400 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-gray-400">1800-123-4567</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-gray-400 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-gray-400">info@sbmservices.com</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-gray-400 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-gray-400">
                    Mon-Fri: 9:00 AM - 6:00 PM
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 SBM Services. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li>
                  <Link
                    to="/terms"
                    className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sitemap"
                    className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
                  >
                    Sitemap
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
