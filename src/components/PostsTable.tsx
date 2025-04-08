import React from "react";
import type { Post } from "../types";
import { Edit, Trash2 } from "lucide-react";

interface PostsTableProps {
  posts: Post[];
}

export default function PostsTable({ posts }: PostsTableProps) {
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
        <thead className="bg-[#F9FAFB]">
          <tr className="text-left text-sm text-[#111827] border-b">
            <th className="py-3 px-4 font-medium">Body Content</th>
            <th className="py-3 px-4 font-medium">Title</th>
            <th className="py-3 px-4 font-medium">Post ID</th>
            <th className="py-3 px-4 font-medium">User</th>
            <th className="py-3 px-4 font-medium">Status</th>
            <th className="py-3 px-4 font-medium">Action</th>
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
                <td className="py-3 px-4">{truncateText(post.body, 30)}</td>
                <td className="py-3 px-4">{truncateText(post.title, 25)}</td>
                <td className="py-3 px-4 whitespace-nowrap">{formatDate()}</td>
                <td className="py-3 px-4">{getRandomUser(post.id)}</td>
                <td className="py-3 px-4">
                  <span className={`${statusColor} py-2 px-4 rounded-lg`}>
                    {status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <div className="py-2 px-2 bg-[#F7F7F7] rounded-full">
                      <button className="text-gray-500  hover:text-purple-600">
                        <Edit size={16} />
                      </button>
                    </div>
                    <div className="py-2 px-2 bg-[#FFF5F5] rounded-full">
                      <button className=" text-[#FF0F00] hover:text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </div>
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
