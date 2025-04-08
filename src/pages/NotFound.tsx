"use client";

import { Link } from "react-router-dom";
import { ArrowLeft, FileQuestion } from "lucide-react";
import Button from "../components/ui/Button";
import React from "react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <div className="bg-purple-100 p-6 rounded-full">
            <FileQuestion size={64} className="text-purple-600" />
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-2">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>

        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2"
          >
            <ArrowLeft size={16} />
            Go Back
          </Button>

          <Button as={Link} to="/" className="flex items-center justify-center">
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
