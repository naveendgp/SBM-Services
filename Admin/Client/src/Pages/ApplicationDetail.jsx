import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  X,
  Clock,
  AlertCircle,
  FileText,
  User,
  Home,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Briefcase,
  CreditCard,
  Send,
  Download,
  ExternalLink,
} from "lucide-react";
import AdminLayout from "../Components/AdminLayout";
import { adminService } from "../services/api";

export default function ApplicationDetail() {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    const fetchApplicationDetail = async () => {
      try {
        setLoading(true);
        const response = await adminService.getApplicationById(id);
        setApplication(response.data.application);
      } catch (err) {
        console.error("Error fetching application details:", err);
        setError("Failed to load application details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationDetail();
  }, [id]);

  const handleStatusUpdate = async (newStatus) => {
    try {
      setStatusUpdateLoading(true);
      const response = await adminService.updateApplicationStatus(id, {
        status: newStatus,
      });
      setApplication(response.data.application);
    } catch (err) {
      console.error("Error updating status:", err);
      setError("Failed to update application status. Please try again.");
    } finally {
      setStatusUpdateLoading(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setCommentLoading(true);
      const response = await adminService.addApplicationNote(id, {
        text: newComment,
      });
      setApplication((prev) => ({
        ...prev,
        notes: response.data.notes,
      }));
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
      setError("Failed to add comment. Please try again.");
    } finally {
      setCommentLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <Check className="mr-1 h-4 w-4" />
            Approved
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            <X className="mr-1 h-4 w-4" />
            Rejected
          </span>
        );
      case "pending":
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            <Clock className="mr-1 h-4 w-4" />
            Pending Review
          </span>
        );
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Link
                to="/admin/applications"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Applications
              </Link>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!application) {
    return (
      <AdminLayout>
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Application not found. It may have been deleted or you may
                    not have permission to view it.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Link
                to="/admin/applications"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Applications
              </Link>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-4">
                <li>
                  <div>
                    <Link
                      to="/admin/dashboard"
                      className="text-sm font-medium text-gray-500 hover:text-gray-700"
                    >
                      Dashboard
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg
                      className="flex-shrink-0 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <Link
                      to="/admin/applications"
                      className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                    >
                      Applications
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg
                      className="flex-shrink-0 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span
                      className="ml-4 text-sm font-medium text-gray-500"
                      aria-current="page"
                    >
                      Application #{application.referenceNumber}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>

          {/* Header */}
          <div className="md:flex md:items-center md:justify-between mb-8">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-semibold text-gray-900">
                Loan Application {application.referenceNumber}
              </h1>
              <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-4">
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <User className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                  {application.firstName}{" "}
                  {application.lastName}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                  {formatDate(application.applicationDate)}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <DollarSign className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                  {formatCurrency(application.loanAmount)}
                </div>
              </div>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <span className="ml-3">{getStatusBadge(application.status)}</span>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6 bg-gray-50">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Personal Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Details of the loan applicant.
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {application.firstName}{" "}
                    {application.lastName}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {application.email}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Phone number
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {application.phone}
                  </dd>
                </div>
               
                
              </dl>
            </div>
          </div>

          {/* Loan Information */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6 bg-gray-50">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Loan Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Details of the requested loan.
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Loan Type
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {application.loanType}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Loan Amount
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 font-semibold">
                    {formatCurrency(application.loanAmount)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Loan Term
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {application.loanTerm} months
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Purpose</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {application.purpose}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Take Action */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6 bg-gray-50">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Take Action
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Approve or reject this loan application.
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <button
                  type="button"
                  onClick={() => handleStatusUpdate("approved")}
                  disabled={
                    statusUpdateLoading || application.status === "approved"
                  }
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                    application.status === "approved"
                      ? "bg-green-300 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  }`}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Approve Application
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusUpdate("rejected")}
                  disabled={
                    statusUpdateLoading || application.status === "rejected"
                  }
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                    application.status === "rejected"
                      ? "bg-red-300 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  }`}
                >
                  <X className="mr-2 h-4 w-4" />
                  Reject Application
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusUpdate("pending")}
                  disabled={
                    statusUpdateLoading || application.status === "pending"
                  }
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                    application.status === "pending"
                      ? "bg-yellow-300 cursor-not-allowed"
                      : "bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  }`}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Mark as Pending
                </button>
              </div>
            </div>
          </div>

          {/* Add a comment */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6 bg-gray-50">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Add a Comment
              </h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <form onSubmit={handleAddComment}>
                <div>
                  <label htmlFor="comment" className="sr-only">
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    rows={3}
                    className="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md"
                    placeholder="Add your notes or comments about this application..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                  />
                </div>
                <div className="mt-3 flex justify-end">
                  <button
                    type="submit"
                    disabled={commentLoading || !newComment.trim()}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {commentLoading ? (
                      <>
                        <span className="mr-2">Saving...</span>
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Add Comment
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Comments history */}
          {application.notes && application.notes.length > 0 && (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
              <div className="px-4 py-5 sm:px-6 bg-gray-50">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Comment History
                </h3>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                <ul className="space-y-6">
                  {application.notes.map((note, index) => (
                    <li key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {note.author}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatDate(note.date)}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{note.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
