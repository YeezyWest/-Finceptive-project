"use client";

import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Logo from "../components/Logo";

// Validation schema
const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<SignInFormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof SignInFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate form data
      signInSchema.parse(formData);

      // Simulate authentication
      await new Promise((resolve) => setTimeout(resolve, 1000));
      localStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert Zod errors to a more usable format
        const formattedErrors: Partial<SignInFormData> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            formattedErrors[err.path[0] as keyof SignInFormData] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left section with beige background */}
      <div className="hidden md:flex md:w-1/2 flex-col bg-[#F8F2DC] p-8">
        <div className="mb-8">
          <img
            src="/assets/logo.svg"
            alt="Mobile app preview"
            className="w-30 30"
          />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="absolute bottom-0 max-w-2xl">
            <img
              src="/assets/phone.png"
              alt="Mobile app preview"
              className="w-full md:h-[36rem] object-cover mx-auto"
            />
          </div>
        </div>
      </div>

      {/* Right section with white background */}
      <div className="w-full md:w-1/2 flex flex-col p-8 bg-white">
        <div className="md:hidden mb-8">
          <img
            src="/assets/logo.svg"
            alt="Mobile app preview"
            className="w-30 30"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          <h1 className="text-[40px] font-medium mb-8">Sign In</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-[16px] font-medium"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block  text-[16px] mb-2 font-medium"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />
            </div>

            <Button
              className="py-4"
              type="submit"
              fullWidth
              loading={isLoading}
            >
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
