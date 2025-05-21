import React, { useState } from "react";
import { motion } from "framer-motion";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState();
  const [interestRate, setInterestRate] = useState();
  const [loanTenure, setLoanTenure] = useState();
  const [emi, setEmi] = useState(null); 

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate);
    const tenure = parseFloat(loanTenure);

    if (principal <= 0 || rate <= 0 || tenure <= 0) {
      alert("Please enter valid values for all fields.");
      return;
    }

    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;
    const emiValue =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    setEmi(emiValue.toFixed(2));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full border border-gray-100">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl font-bold mb-5"
        >
          <span className="text-gray-900">Simple, Transparent</span>
          <br />
          <span className="bg-gradient-to-br from-indigo-700 via-blue-600 to-purple-700 bg-clip-text text-transparent">
            Loan Solutions
          </span>
        </motion.h1>
        <p className="text-gray-600 text-center mb-8">
          Calculate your monthly EMI with ease.
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Amount
            </label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              placeholder="Enter loan amount"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interest Rate (%)
            </label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              placeholder="Enter interest rate"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Tenure (Years)
            </label>
            <input
              type="number"
              value={loanTenure}
              onChange={(e) => setLoanTenure(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              placeholder="Enter loan tenure"
            />
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
            onClick={calculateEMI}
          >
            Calculate EMI
          </button>
        </div>

        {emi && (
          <div className="mt-8 text-center">
            <p className="text-lg font-semibold text-gray-700">
              Estimated EMI:{" "}
              <span className="text-blue-600 text-2xl font-bold">₹{emi}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanCalculator;
