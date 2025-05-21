import { useState, useEffect } from "react";
import {
  CircleDollarSign,
  Users,
  FileCheck,
  Clock,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Search,
  ChevronLeft,
  ChevronRight,
  Filter,
  ExternalLink,
  Check,
  X,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import AdminLayout from "../Components/AdminLayout";
import { adminService } from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingReview: 0,
    approved: 0,
    rejected: 0,
    totalUsers: 0,
    totalAmount: 0,
  });

  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "applicationDate",
    direction: "desc",
  });
  const [filters, setFilters] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch dashboard stats
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError("");

        // Fetch dashboard statistics
        const statsResponse = await adminService.getDashboardStats();
        setStats(statsResponse.data);
        console.log("data",statsResponse)
        // Fetch recent applications
        const applicationsResponse = await adminService.getApplications(
          currentPage,
          10,
          {
            ...filters,
            search: searchTerm,
            sortBy: sortConfig.key,
            sortOrder: sortConfig.direction,
          }
        );

        setApplications(applicationsResponse.data.applications);
        console.log("application",applicationsResponse)
        setTotalPages(applicationsResponse.data.totalPages);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError(
          "Failed to load dashboard data. Please try refreshing the page."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [currentPage, filters, searchTerm, sortConfig]);

  // Sort function
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Get status badge style
  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Check className="mr-1 h-3 w-3" />
            Approved
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <X className="mr-1 h-3 w-3" />
            Rejected
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <AlertCircle className="mr-1 h-3 w-3" />
            Pending
          </span>
        );
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // The effect will trigger the search
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <AdminLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {error && (
            <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Stats cards */}
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Total Applications Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FileCheck className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Applications
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {stats.totalApplications}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link
                    to="/admin/applications"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    View all
                  </Link>
                </div>
              </div>
            </div>

            {/* Pending Review Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Pending Review
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {stats.pendingReview}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link
                    to="/admin/applications?status=pending"
                    className="font-medium text-yellow-600 hover:text-yellow-500"
                  >
                    Review applications
                  </Link>
                </div>
              </div>
            </div>

            {/* Total Users Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Users className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Users
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {stats.totalUsers}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link
                    to="/admin/users"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Manage users
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Second row of stats cards */}
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Approved Applications */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Approved Applications
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {stats.approved}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link
                    to="/admin/applications?status=approved"
                    className="font-medium text-green-600 hover:text-green-500"
                  >
                    View approved
                  </Link>
                </div>
              </div>
            </div>

            {/* Rejected Applications */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <X className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Rejected Applications
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {stats.rejected}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link
                    to="/admin/applications?status=rejected"
                    className="font-medium text-red-600 hover:text-red-500"
                  >
                    View rejected
                  </Link>
                </div>
              </div>
            </div>

            {/* Total Loan Amount */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CircleDollarSign className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        ₹ Total Loan Amount
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {stats.totalAmount.toLocaleString()}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link
                    to="/admin/reports"
                    className="font-medium text-emerald-600 hover:text-emerald-500"
                  >
                    View reports
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Loan Applications Table */}
          <div className="mt-8">
            <div className="sm:flex sm:items-center sm:justify-between">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Recent Loan Applications
              </h3>
             
            </div>

            <div className="mt-4 flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow-md overflow-hidden border border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => requestSort("id")}
                          >
                            <div className="flex items-center">
                              Application ID
                              {sortConfig.key === "id" && (
                                <span className="ml-1">
                                  {sortConfig.direction === "asc" ? (
                                    <ArrowUp className="h-3 w-3" />
                                  ) : (
                                    <ArrowDown className="h-3 w-3" />
                                  )}
                                </span>
                              )}
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => requestSort("applicantName")}
                          >
                            <div className="flex items-center">
                              Applicant
                              {sortConfig.key === "applicantName" && (
                                <span className="ml-1">
                                  {sortConfig.direction === "asc" ? (
                                    <ArrowUp className="h-3 w-3" />
                                  ) : (
                                    <ArrowDown className="h-3 w-3" />
                                  )}
                                </span>
                              )}
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => requestSort("loanType")}
                          >
                            <div className="flex items-center">
                              Loan Type
                              {sortConfig.key === "loanType" && (
                                <span className="ml-1">
                                  {sortConfig.direction === "asc" ? (
                                    <ArrowUp className="h-3 w-3" />
                                  ) : (
                                    <ArrowDown className="h-3 w-3" />
                                  )}
                                </span>
                              )}
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => requestSort("amount")}
                          >
                            <div className="flex items-center">
                              Amount
                              {sortConfig.key === "amount" && (
                                <span className="ml-1">
                                  {sortConfig.direction === "asc" ? (
                                    <ArrowUp className="h-3 w-3" />
                                  ) : (
                                    <ArrowDown className="h-3 w-3" />
                                  )}
                                </span>
                              )}
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => requestSort("applicationDate")}
                          >
                            <div className="flex items-center">
                              Date
                              {sortConfig.key === "applicationDate" && (
                                <span className="ml-1">
                                  {sortConfig.direction === "asc" ? (
                                    <ArrowUp className="h-3 w-3" />
                                  ) : (
                                    <ArrowDown className="h-3 w-3" />
                                  )}
                                </span>
                              )}
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => requestSort("status")}
                          >
                            <div className="flex items-center">
                              Status
                              {sortConfig.key === "status" && (
                                <span className="ml-1">
                                  {sortConfig.direction === "asc" ? (
                                    <ArrowUp className="h-3 w-3" />
                                  ) : (
                                    <ArrowDown className="h-3 w-3" />
                                  )}
                                </span>
                              )}
                            </div>
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {isLoading ? (
                          <tr>
                            <td
                              colSpan="7"
                              className="px-6 py-4 text-center text-sm text-gray-500"
                            >
                              <div className="flex justify-center items-center">
                                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500 mr-3"></div>
                                Loading applications...
                              </div>
                            </td>
                          </tr>
                        ) : applications.length === 0 ? (
                          <tr>
                            <td
                              colSpan="7"
                              className="px-6 py-4 text-center text-sm text-gray-500"
                            >
                              No applications found
                            </td>
                          </tr>
                        ) : (
                          applications.map((application) => (
                            <tr
                              key={application.id}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                                {application.referenceNumber}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                                    <span className="text-xs font-medium text-white">
                                      {application.firstName.charAt(0)}
                                      {application.lastName.charAt(0)}
                                    </span>
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                      {application.firstName}{" "}
                                      {application.lastName}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {application.email}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {application.loanType}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {formatCurrency(application.loanAmount)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {formatDate(application.applicationDate)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {getStatusBadge(application.status)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Link
                                  to={`/admin/applications/${application._id}`}
                                  className="text-blue-600 hover:text-blue-900 flex items-center justify-end"
                                >
                                  View Details
                                  <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                                </Link>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Pagination */}
            <nav
              className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4"
              aria-label="Pagination"
            >
              <div className="hidden sm:block">
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">
                    {applications.length > 0 ? (currentPage - 1) * 10 + 1 : 0}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(currentPage * 10, stats.totalApplications)}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">{stats.totalApplications}</span>{" "}
                  results
                </p>
              </div>
              <div className="flex-1 flex justify-between sm:justify-end">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentPage === 1 || isLoading}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentPage >= totalPages || isLoading}
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
