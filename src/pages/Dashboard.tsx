"use client";

import React from "react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPosts, deletePost, updatePost, createPost } from "../api/posts";
import type { Post } from "../types";

import MetricCard from "../components/MatricCard";
import PostsTable from "../components/PostsTable";
import SearchInput from "../components/ui/SearchInput";
import Pagination from "../components/Pagination";
import FilterButton from "../components/ui/FilterButton";
import { Filter, ListFilter, Plus } from "lucide-react";
import DashboardLayout from "../components/DashboardLayouts";
import Modal from "../components/ui/Modal";
import EditPostForm from "../components/EditPostForm";
import CreatePostForm from "../components/CreatePostForm";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import useToast from "../hooks/useToaster";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterFields, setFilterFields] = useState({
    title: true,
    body: true,
  });
  const postsPerPage = 10;

  // State for edit modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);

  // State for create modal
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // State for delete confirmation
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);

  // Toast notifications
  const { showToast, ToastContainer } = useToast();

  // Query client for cache invalidation
  const queryClient = useQueryClient();

  // Fetch posts query
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  // Create post mutation
  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setCreateModalOpen(false);
      showToast("Post created successfully", "success");
    },
    onError: () => {
      showToast("Failed to create post", "error");
    },
  });

  // Update post mutation
  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setEditModalOpen(false);
      showToast("Post updated successfully", "success");
    },
    onError: () => {
      showToast("Failed to update post", "error");
    },
  });

  // Delete post mutation
  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setDeleteDialogOpen(false);
      showToast("Post deleted successfully", "success");
    },
    onError: () => {
      showToast("Failed to delete post", "error");
    },
  });

  // Handle create post
  const handleCreatePost = (newPost: Omit<Post, "id">) => {
    createPostMutation.mutate(newPost);
  };

  // Handle edit post
  const handleEditPost = (post: Post) => {
    setCurrentPost(post);
    setEditModalOpen(true);
  };

  // Handle delete post
  const handleDeletePost = (postId: number) => {
    setPostToDelete(postId);
    setDeleteDialogOpen(true);
  };

  // Handle edit form submission
  const handleEditSubmit = (updatedPost: Post) => {
    updatePostMutation.mutate(updatedPost);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (postToDelete !== null) {
      deletePostMutation.mutate(postToDelete);
    }
  };


  // Modify filteredPosts calculation
  const filteredPosts =
    posts?.filter((post) => {
      const matchesTitle =
        filterFields.title &&
        post.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBody =
        filterFields.body &&
        post.body.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTitle || matchesBody;
    }) || [];

  // Calculate pagination
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <DashboardLayout activePage="posts">
      {/* Toast Container */}
      <ToastContainer />

      {/* Header Section */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-medium sm:text-[32px]">Post Metrics</h1>
          <p className="mt-3 text-xs font-normal text-gray-500 sm:text-sm">
            View all your post metrics here
          </p>
        </div>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white shadow-md transition-colors hover:bg-purple-700"
          onClick={() => setCreateModalOpen(true)}
          aria-label="Create new post"
        >
          <Plus size={20} />
        </button>
      </div>
      <div className="block border-b border-gray-200 md:hidden" />

      {/* Metrics Cards */}
      <div className="my-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
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
      <div className="mb-4 flex  items-center gap-3 md:flex-row md:justify-between md:gap-4">
        <div className="w-full md:max-w-[400px]">
          <SearchInput
            placeholder="Search Post"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="flex border p-3 rounded-md cursor-pointer items-center lg:hidden">
          <ListFilter size={16} />
        </div>
        <div className="hidden lg:flex w-full flex-wrap items-center gap-2 md:w-auto">
          <FilterButton
            filterFields={filterFields}
            onFilterChange={(newFilters) => {
              // Ensure at least one filter is always active
              if (!newFilters.title && !newFilters.body) return;
              setFilterFields(newFilters);
            }}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={240}
          />
        </div>
      </div>

      {/* Posts Table */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="py-4 text-center md:py-8">Loading posts...</div>
        ) : error ? (
          <div className="py-4 text-center text-red-500 md:py-8">
            Error loading posts
          </div>
        ) : (
          <PostsTable
            posts={currentPosts}
            onEdit={handleEditPost}
            onDelete={handleDeletePost}
          />
        )}
      </div>

      {/* Create Post Modal */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Create New Post"
      >
        <CreatePostForm
          onSubmit={handleCreatePost}
          onCancel={() => setCreateModalOpen(false)}
          isLoading={createPostMutation.isPending}
        />
      </Modal>

      {/* Edit Post Modal */}
      {currentPost && (
        <Modal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          title="Edit Post"
        >
          <EditPostForm
            post={currentPost}
            onSubmit={handleEditSubmit}
            onCancel={() => setEditModalOpen(false)}
            isLoading={updatePostMutation.isPending}
          />
        </Modal>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deletePostMutation.isPending}
      />
    </DashboardLayout>
  );
}
