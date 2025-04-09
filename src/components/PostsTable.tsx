"use client";

import React from "react";
import type { Post } from "../types";
import { Edit, Trash2 } from "lucide-react";

interface PostsTableProps {
  posts: Post[];
  onEdit: (post: Post) => void;
  onDelete: (postId: number) => void;
}

export default function PostsTable({
  posts,
  onEdit,
  onDelete,
}: PostsTableProps) {
  // Generate random status for each post
  const getRandomStatus = (id: number) => {
    const statuses = ["Success", "Failed", "Pending"];
    // Use the post ID to deterministically assign a status
    const index = id % 10 === 0 ? 1 : id % 7 === 0 ? 2 : 0;
    return statuses[index];
  };

  // Generate random user for each post
  const getRandomUser = (id: number) => {
    const users = [
      "Temitayo",
      "Fenma",
      "Sandra",
      "Alex",
      "Suzzy",
      "Monica",
      "Faith",
      "Sweeder",
      "James",
      "Femi",
    ];
    return users[id % users.length];
  };

  // Format date
  const formatDate = () => {
    return "21 June 2024 • 4:15pm";
  };

  // Truncate text
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-left text-sm text-gray-500">
            <th className="px-4 py-3 font-medium">Body Content</th>
            <th className="px-4 py-3 font-medium">Title</th>
            <th className="px-4 py-3 font-medium">Post ID</th>
            <th className="px-4 py-3 font-medium">User</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => {
            const status = getRandomStatus(post.id);
            const statusColor =
              status === "Success"
                ? "text-[#1ACE37] bg-[#E8FFF6]"
                : status === "Failed"
                ? "text-[#FF0F00] bg-[#FFF5F5]"
                : "text-[#EA872D] bg-[#FFF6ED]";

            return (
              <tr key={post.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{truncateText(post.body, 30)}</td>
                <td className="px-4 py-3">{truncateText(post.title, 25)}</td>
                <td className="whitespace-nowrap px-4 py-3">{formatDate()}</td>
                <td className="px-4 py-3">{getRandomUser(post.id)}</td>
                <td className="px-4 py-3">
                  <span className={`${statusColor} px-4 py-1 rounded-2xl`}>
                    {status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      className="text-[#515151] bg-[#F7F7F7] p-3 rounded-full hover:text-purple-600"
                      onClick={() => onEdit(post)}
                      aria-label="Edit post"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      className="text-[#FF0F00] bg-[#FFF5F5] p-3 rounded-full hover:text-red-500"
                      onClick={() => onDelete(post.id)}
                      aria-label="Delete post"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
