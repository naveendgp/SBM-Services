import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Download,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Check,
  X,
  Clock,
  AlertCircle,
  RefreshCw,
  Calendar,
  FileCheck,
} from "lucide-react";
import AdminLayout from "../Components/AdminLayout";
import { adminService } from "../services/api";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalApplications, setTotalApplications] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "applicationDate",
    direction: "desc",
  });
  const [filters, setFilters] = useState({
    status: "",
    loanType: "",
    dateRange: "",
  });
  const [error, setError] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Available loan types for filtering
  const loanTypes = [
    "Personal Loan",
    "Business Loan",
    "Home Loan",
    "Education Loan",
    "Vehicle Loan",
  ];

  useEffect(() => {
    fetchApplications();
  }, [currentPage, filters, searchTerm, sortConfig]);

  const fetchApplications = async () => {
    try {
      setIsLoading(true);
      setError("");

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
      setTotalPages(applicationsResponse.data.totalPages);
      setTotalApplications(applicationsResponse.data.totalApplications);
    } catch (error) {
      console.error("Error fetching applications:", error);
      setError("Failed to load applications. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Sort function
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Handle page changes
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      status: "",
      loanType: "",
      dateRange: "",
    });
    setSearchTerm("");
    setCurrentPage(1);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get status badge
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
            Unknown
          </span>
        );
    }
  };

  // Export applications as CSV
  const exportCSV = () => {
    if (applications.length === 0) return;

    const headers = [
      "ID",
      "Reference",
      "Applicant Name",
      "Email",
      "Phone",
      "Loan Type",
      "Amount",
      "Application Date",
      "Status",
    ];

    const csvData = applications.map((app) => [
      app._id,
      app.referenceNumber,
      `${app.firstName} ${app.lastName}`,
      app.email,
      app.phoneNumber,
      app.loanType,
      app.loanAmount,
      new Date(app.applicationDate).toLocaleDateString(),
      app.status,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `loan-applications-${new Date().toISOString().slice(0, 10)}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Loan Applications
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and review all loan applications.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-4">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
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

          {/* Search and filter bar */}
          <div className="bg-white shadow-sm rounded-lg p-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <form
                onSubmit={handleSearch}
                className="w-full sm:w-auto mb-4 sm:mb-0"
              >
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Search by name, ID, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </form>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </button>
                <button
                  type="button"
                  onClick={exportCSV}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </button>
                <button
                  type="button"
                  onClick={fetchApplications}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </button>
              </div>
            </div>

            {/* Filter options */}
            {showFilters && (
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    value={filters.status}
                    onChange={(e) =>
                      handleFilterChange("status", e.target.value)
                    }
                  >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="loanType"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Loan Type
                  </label>
                  <select
                    id="loanType"
                    name="loanType"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    value={filters.loanType}
                    onChange={(e) =>
                      handleFilterChange("loanType", e.target.value)
                    }
                  >
                    <option value="">All Types</option>
                    {loanTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="dateRange"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date Range
                  </label>
                  <select
                    id="dateRange"
                    name="dateRange"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    value={filters.dateRange}
                    onChange={(e) =>
                      handleFilterChange("dateRange", e.target.value)
                    }
                  >
                    <option value="">All Time</option>
                    <option value="today">Today</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="last7days">Last 7 Days</option>
                    <option value="last30days">Last 30 Days</option>
                    <option value="thisMonth">This Month</option>
                    <option value="lastMonth">Last Month</option>
                  </select>
                </div>
                <div className="sm:col-span-3 flex justify-end">
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Applications table */}
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => requestSort("id")}
                        >
                          <div className="flex items-center">
                            Reference ID
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
                            <div className="flex flex-col items-center justify-center py-6">
                              <FileCheck className="h-12 w-12 text-gray-400 mb-3" />
                              <p className="text-lg font-medium text-gray-500">
                                No applications found
                              </p>
                              <p className="text-sm text-gray-500 mt-1">
                                Try adjusting your filters or search term
                              </p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        applications.map((application) => (
                          <tr
                            key={application.id || application._id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                              {application.referenceNumber}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                                  <span className="text-xs font-medium text-white">
                                    {application.firstName &&
                                      application.firstName.charAt(0)}
                                    {application.lastName &&
                                      application.lastName.charAt(0)}
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
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 text-gray-400 mr-1.5" />
                                {formatDate(application.applicationDate)}
                              </div>
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
                  {Math.min(currentPage * 10, totalApplications)}
                </span>{" "}
                of <span className="font-medium">{totalApplications}</span>{" "}
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
    </AdminLayout>
  );
}
