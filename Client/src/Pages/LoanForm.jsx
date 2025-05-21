import { useState, useEffect } from "react";
import {
  Upload,
  User,
  Mail,
  Phone,
  Home,
  Briefcase,
  FileText,
  CreditCard,
  Calendar,
  Clock,
  Check,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { loanService } from "../services/api"; // Import the API service
import { useNavigate } from "react-router-dom";

export default function LoanApplicationForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    employmentStatus: "",
    employer: "",
    monthlyIncome: "",
    loanType: "Home Loan",
    loanAmount: "",
    loanTerm: "30",
  });

  // State to hold actual file objects
  const [fileObjects, setFileObjects] = useState({
    identityProof: null,
    addressProof: null,
    incomeProof: null,
    bankStatements: null,
    propertyDocs: null,
  });

  // State to display file information in the UI
  const [uploadedDocs, setUploadedDocs] = useState({
    identityProof: null,
    addressProof: null,
    incomeProof: null,
    bankStatements: null,
    propertyDocs: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, name) => {
    const file = e.target.files[0];
    if (file) {
      // Store actual file object
      setFileObjects((prev) => ({
        ...prev,
        [name]: file,
      }));

      // Store file info for UI display
      setUploadedDocs((prev) => ({
        ...prev,
        [name]: {
          name: file.name,
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        },
      }));
    }
  };

  // Update the handleSubmit function to properly handle document uploads and success state
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    try {
      // First submit application data only (no files yet)
      console.log("Submitting application data...");
      const applicationResponse = await loanService.submitApplication({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        employmentStatus: formData.employmentStatus,
        employer: formData.employer,
        monthlyIncome: parseFloat(formData.monthlyIncome) || 0,
        loanType: formData.loanType,
        loanAmount: parseFloat(formData.loanAmount) || 0,
        loanTerm: parseInt(formData.loanTerm) || 30,
      });

      console.log("Application submitted:", applicationResponse);

      // Store the reference number regardless of document upload
      const refNumber = applicationResponse.data?.referenceNumber || "";
      setReferenceNumber(refNumber);

      // Get application ID from response
      const applicationId = applicationResponse.data?.loanApplication?._id;

      // Check if we have files to upload and a valid application ID
      const hasFiles = Object.values(fileObjects).some((file) => file !== null);

      if (hasFiles && applicationId) {
        console.log("Uploading documents for application:", applicationId);

        try {
          // Upload documents separately
          await loanService.uploadDocuments(applicationId, fileObjects);
          console.log("Documents uploaded successfully");
        } catch (uploadError) {
          console.error("Document upload error:", uploadError);
          // Continue to success screen even if document upload fails
          // Just show a warning about documents
          setError(
            "Your application was submitted, but there was an issue uploading some documents. You can upload them later."
          );
        }
      }

      // Always set success to true after primary application is submitted
      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (error) {
      console.error("Application submission error:", error);
      setIsSubmitting(false);
      setError(
        error.message ||
          "An error occurred while submitting your application. Please try again."
      );
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // Check if current step is complete
  const isStepComplete = () => {
    if (step === 1) {
      return (
        formData.firstName &&
        formData.lastName &&
        formData.email &&
        formData.phone
      );
    } else if (step === 2) {
      return (
        formData.employmentStatus &&
        formData.monthlyIncome &&
        formData.loanType &&
        formData.loanAmount &&
        formData.loanTerm
      );
    } else if (step === 3) {
      return (
        uploadedDocs.identityProof &&
        uploadedDocs.addressProof &&
        uploadedDocs.incomeProof &&
        uploadedDocs.bankStatements
      );
    }
    return true;
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-2xl w-full">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Application Submitted!
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              Thank you for submitting your loan application with SBM Services.
            </p>

            {referenceNumber && (
              <div className="mt-4 bg-blue-50 rounded-lg p-4">
                <p className="font-medium text-blue-800">
                  Your Reference Number
                </p>
                <p className="text-2xl font-bold text-blue-900">
                  {referenceNumber}
                </p>
                <p className="text-sm text-blue-700 mt-1">
                  Please save this number for future reference
                </p>
              </div>
            )}

            <div className="mt-8 bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h3 className="font-medium text-blue-800">What happens next?</h3>
              <ul className="mt-2 space-y-2">
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-200 flex items-center justify-center mr-2">
                    <span className="text-xs font-medium text-blue-800">1</span>
                  </span>
                  <p className="text-sm text-blue-700">
                    Our team will review your application within 1-2 business
                    days
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-200 flex items-center justify-center mr-2">
                    <span className="text-xs font-medium text-blue-800">2</span>
                  </span>
                  <p className="text-sm text-blue-700">
                    You'll receive an email confirmation with your application
                    details
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-200 flex items-center justify-center mr-2">
                    <span className="text-xs font-medium text-blue-800">3</span>
                  </span>
                  <p className="text-sm text-blue-700">
                    A loan officer will contact you to discuss next steps
                  </p>
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => (window.location.href = "/")}
              >
                Return to Homepage
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
            SBM Services Loan Application
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Please provide your information and required documents to proceed.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between mb-4">
            {[
              { icon: <User size={20} />, label: "Personal Info" },
              { icon: <CreditCard size={20} />, label: "Loan Details" },
              { icon: <FileText size={20} />, label: "Documents" },
              { icon: <Check size={20} />, label: "Review" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center w-1/4">
                <div
                  className={`rounded-full h-12 w-12 flex items-center justify-center transition-all duration-300 ${
                    step >= index + 1
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {item.icon}
                </div>
                <p className="text-sm mt-2 font-medium text-gray-700">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
          <div className="overflow-hidden h-2 rounded-full bg-gray-200 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500 ease-out"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4">
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

        {/* Form Container */}
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
          <div className="p-8 md:p-10">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Personal Information
                  </h2>
                  <p className="text-gray-600">
                    Please provide your contact details.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User size={18} className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="pl-10 py-4 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                          placeholder="John"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="px-4 py-4 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                        placeholder="Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail size={18} className="text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="pl-10 py-4 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                          placeholder="johndoe@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone size={18} className="text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="pl-10 py-4 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                          placeholder="(123) 456-7890"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Loan Details */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Loan Details
                  </h2>
                  <p className="text-gray-600">
                    Please provide your employment and loan information
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Employment Status
                      </label>
                      <select
                        name="employmentStatus"
                        value={formData.employmentStatus}
                        onChange={handleChange}
                        className="px-4 py-3 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
                      >
                        <option value="">Select Status</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Self-employed">Self-employed</option>
                        <option value="Unemployed">Unemployed</option>
                        <option value="Retired">Retired</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Employer Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Briefcase size={18} className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="employer"
                          value={formData.employer}
                          onChange={handleChange}
                          className="pl-10 py-3 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
                          placeholder="Company Inc."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Monthly Income ($)
                      </label>
                      <input
                        type="text"
                        name="monthlyIncome"
                        value={formData.monthlyIncome}
                        onChange={handleChange}
                        className="px-4 py-3 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
                        placeholder="5000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Loan Type
                      </label>
                      <select
                        name="loanType"
                        value={formData.loanType}
                        onChange={handleChange}
                        className="px-4 py-3 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
                      >
                        <option value="Home Loan">Home Loan</option>
                        <option value="Business Loan">Business Loan</option>
                        <option value="Personal Loan">Personal Loan</option>
                        <option value="Investment Property">
                          Investment Property
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Loan Amount ($)
                      </label>
                      <input
                        type="text"
                        name="loanAmount"
                        value={formData.loanAmount}
                        onChange={handleChange}
                        className="px-4 py-3 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
                        placeholder="350000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Loan Term (years)
                      </label>
                      <select
                        name="loanTerm"
                        value={formData.loanTerm}
                        onChange={handleChange}
                        className="px-4 py-3 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
                      >
                        <option value="30">30 Years</option>
                        <option value="20">20 Years</option>
                        <option value="15">15 Years</option>
                        <option value="10">10 Years</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Document Upload */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Document Upload
                  </h2>
                  <p className="text-gray-600">
                    Please upload the required documents for verification
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        label: "Identity Proof",
                        name: "identityProof",
                        description: "Passport, Driver's License, or State ID",
                      },
                      {
                        label: "Address Proof",
                        name: "addressProof",
                        description: "Utility bill or bank statement",
                      },
                      {
                        label: "Income Proof",
                        name: "incomeProof",
                        description: "Pay stubs or tax returns",
                      },
                      {
                        label: "Bank Statements",
                        name: "bankStatements",
                        description: "Last 3 months of statements",
                      },
                      {
                        label: "Property Documents",
                        name: "propertyDocs",
                        description:
                          "For existing property or purchase agreement",
                      },
                    ].map((doc, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors duration-200"
                      >
                        <div className="mb-4">
                          <h3 className="font-medium text-gray-900">
                            {doc.label}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {doc.description}
                          </p>
                        </div>

                        {uploadedDocs[doc.name] ? (
                          <div className="flex items-center justify-between bg-blue-50 p-3 rounded-md">
                            <div className="flex items-center space-x-3">
                              <FileText className="h-6 w-6 text-blue-600" />
                              <div>
                                <p className="text-sm font-medium text-blue-900">
                                  {uploadedDocs[doc.name].name}
                                </p>
                                <p className="text-xs text-blue-700">
                                  {uploadedDocs[doc.name].size}
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                              onClick={() => {
                                setFileObjects((prev) => ({
                                  ...prev,
                                  [doc.name]: null,
                                }));
                                setUploadedDocs((prev) => ({
                                  ...prev,
                                  [doc.name]: null,
                                }));
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <div>
                            <label
                              htmlFor={doc.name}
                              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                            >
                              <Upload className="mr-2 h-4 w-4" />
                              Upload {doc.label}
                            </label>
                            <input
                              id={doc.name}
                              type="file"
                              accept=".pdf,.jpg,.png"
                              className="hidden"
                              onChange={(e) => handleFileChange(e, doc.name)}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">
                          Important Information
                        </h3>
                        <div className="mt-2 text-sm text-blue-700">
                          <ul className="list-disc pl-5 space-y-1">
                            <li>All documents must be clear and readable</li>
                            <li>
                              Accepted formats: PDF, JPG, PNG (max 10MB each)
                            </li>
                            <li>
                              Documents should not be older than 90 days unless
                              specified
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review Information */}
              {step === 4 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Review Your Application
                  </h2>
                  <p className="text-gray-600">
                    Please review your information before submitting
                  </p>

                  <div className="bg-gray-50 rounded-lg p-6 divide-y divide-gray-200">
                    <div className="pb-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Personal Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-sm">
                        <div>
                          <span className="block text-gray-500">Full Name</span>
                          <span className="font-medium text-gray-900">
                            {formData.firstName} {formData.lastName}
                          </span>
                        </div>
                        <div>
                          <span className="block text-gray-500">
                            Email Address
                          </span>
                          <span className="font-medium text-gray-900">
                            {formData.email}
                          </span>
                        </div>
                        <div>
                          <span className="block text-gray-500">
                            Phone Number
                          </span>
                          <span className="font-medium text-gray-900">
                            {formData.phone}
                          </span>
                        </div>
                        <div>
                          <span className="block text-gray-500">Address</span>
                          <span className="font-medium text-gray-900">
                            {formData.address
                              ? `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`
                              : "Not provided"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="py-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Loan Details
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-sm">
                        <div>
                          <span className="block text-gray-500">
                            Employment Status
                          </span>
                          <span className="font-medium text-gray-900">
                            {formData.employmentStatus}
                          </span>
                        </div>
                        <div>
                          <span className="block text-gray-500">Employer</span>
                          <span className="font-medium text-gray-900">
                            {formData.employer || "N/A"}
                          </span>
                        </div>
                        <div>
                          <span className="block text-gray-500">
                            Monthly Income
                          </span>
                          <span className="font-medium text-gray-900">
                            $
                            {formData.monthlyIncome
                              ? Number(formData.monthlyIncome).toLocaleString()
                              : "N/A"}
                          </span>
                        </div>
                        <div>
                          <span className="block text-gray-500">Loan Type</span>
                          <span className="font-medium text-gray-900">
                            {formData.loanType}
                          </span>
                        </div>
                        <div>
                          <span className="block text-gray-500">
                            Loan Amount
                          </span>
                          <span className="font-medium text-gray-900">
                            $
                            {formData.loanAmount
                              ? Number(formData.loanAmount).toLocaleString()
                              : "N/A"}
                          </span>
                        </div>
                        <div>
                          <span className="block text-gray-500">Loan Term</span>
                          <span className="font-medium text-gray-900">
                            {formData.loanTerm} Years
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Uploaded Documents
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(uploadedDocs).map(
                          ([key, value]) =>
                            value && (
                              <div
                                key={key}
                                className="flex items-center space-x-3 bg-white p-3 rounded-md border border-gray-200"
                              >
                                <FileText className="h-5 w-5 text-blue-600" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    {value.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {value.size}
                                  </p>
                                </div>
                              </div>
                            )
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          By submitting this application, you confirm that all
                          information provided is accurate and complete to the
                          best of your knowledge.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      required
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="terms"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      I agree to the{" "}
                      <a href="#" className="text-blue-600 hover:text-blue-500">
                        Terms and Conditions
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-blue-600 hover:text-blue-500">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-10 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="inline-flex items-center px-5 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                    >
                      <ChevronRight className="h-5 w-5 mr-2 rotate-180" />
                      Previous
                    </button>
                  )}

                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!isStepComplete()}
                      className={`inline-flex items-center px-5 py-3 rounded-lg shadow-sm text-sm font-medium text-white transition-all
                        ${
                          isStepComplete()
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            : "bg-gray-300 cursor-not-allowed"
                        }`}
                    >
                      Next
                      <ChevronRight className="h-5 w-5 ml-2" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center px-6 py-3 rounded-lg shadow-md text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                    >
                      {isSubmitting ? (
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
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Application
                          <Check className="h-5 w-5 ml-2" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Need help? Contact our support team at{" "}
            <a
              href="tel:1800-123-4567"
              className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              1800-123-4567
            </a>{" "}
            or{" "}
            <a
              href="mailto:support@sbmservices.com"
              className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              support@sbmservices.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
