"use client";

import React from "react";
import { useState } from "react";
import type { Post } from "../types";
import Button from "./ui/Button";
import Input from "./ui/Input";

interface CreatePostFormProps {
  onSubmit: (newPost: Omit<Post, "id">) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export default function CreatePostForm({
  onSubmit,
  onCancel,
  isLoading,
}: CreatePostFormProps) {
  const [formData, setFormData] = useState<Omit<Post, "id">>({
    title: "",
    body: "",
    userId: 1, // Default userId
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium">
          Title <span className="text-red-500">*</span>
        </label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          disabled={isLoading}
          placeholder="Enter post title"
        />
      </div>

      <div>
        <label htmlFor="body" className="mb-1 block text-sm font-medium">
          Body <span className="text-red-500">*</span>
        </label>
        <textarea
          id="body"
          name="body"
          value={formData.body}
          onChange={handleChange}
          required
          disabled={isLoading}
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          rows={4}
          placeholder="Enter post content"
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Post"}
        </Button>
      </div>
    </form>
  );
}
