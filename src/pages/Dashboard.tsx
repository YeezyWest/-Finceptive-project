"use client";

import React from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/posts";

import MetricCard from "../components/MatricCard";
import PostsTable from "../components/PostsTable";
import SearchInput from "../components/ui/SearchInput";
import Pagination from "../components/Pagination";
import FilterButton from "../components/ui/FilterButton";
import { Plus } from "lucide-react";
import DashboardLayout from "../components/DashboardLayouts";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  // Filter posts based on search term
  const filteredPosts =
    posts?.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  // Calculate pagination
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Calculate metrics
  const totalSuccessful = Math.floor(totalPosts * 0.64); // Simulating 64% success rate
  const totalFailed = Math.floor(totalPosts * 0.09); // Simulating 9% failure rate

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <DashboardLayout activePage="posts">
      {/* Header Section */}
      <div className="flex justify-between items-start gap-4 mb-4">
        <div>
          <h1 className="text-xl sm:text-[32px] font-medium">Post Metrics</h1>
          <p className="text-gray-500 text-xs sm:text-sm font-normal mt-3">
            View all your post metrics here
          </p>
        </div>
        <button className="bg-purple-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-md hover:bg-purple-700 transition-colors">
          <Plus size={24} />
        </button>
      </div>
      <div className="border-b border-gray-200 block md:hidden"/>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 my-4">
        <MetricCard
          title="Total Post"
          value={139000}
          subtext="+1 today"
          viewDetailsLink="#"
        />
        <MetricCard
          title="Total Successful Post"
          value={89120}
          viewDetailsLink="#"
        />
        <MetricCard
          title="Total Failed Post"
          value={12100}
          subtext="+5% today"
          viewDetailsLink="#"
        />
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col-reverse md:flex-row justify-between items-start gap-3 md:gap-4 mb-4">
        <div className="w-full md:max-w-[400px]">
          <SearchInput
            placeholder="Search Post"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <FilterButton />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={240} // Hardcoded to match design
          />
        </div>
      </div>

      {/* Posts Table */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="text-center py-4 md:py-8">Loading posts...</div>
        ) : error ? (
          <div className="text-center py-4 md:py-8 text-red-500">
            Error loading posts
          </div>
        ) : (
          <PostsTable posts={currentPosts} />
        )}
      </div>
    </DashboardLayout>
  );
}
