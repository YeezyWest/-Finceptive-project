"use client";

import React from "react";

import { useState } from "react";
import type { Post } from "../types";
import Button from "./ui/Button";
import Input from "./ui/Input";

interface EditPostFormProps {
  post: Post;
  onSubmit: (updatedPost: Post) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export default function EditPostForm({
  post,
  onSubmit,
  onCancel,
  isLoading,
}: EditPostFormProps) {
  const [formData, setFormData] = useState<Post>({
    id: post.id,
    title: post.title,
    body: post.body,
    userId: post.userId,
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
          Title
        </label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="body" className="mb-1 block text-sm font-medium">
          Body
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
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
