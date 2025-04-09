import type { Post } from "../types";
import apiClient from "./client";

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await apiClient.get<Post[]>("/posts");
  return response.data;
};

export const fetchPost = async (id: number): Promise<Post> => {
  const response = await apiClient.get<Post>(`/posts/${id}`);
  return response.data;
};

export const createPost = async (post: Omit<Post, "id">): Promise<Post> => {
  const response = await apiClient.post<Post>("/posts", post);
  return response.data;
};

export const updatePost = async (post: Post): Promise<Post> => {
  const response = await apiClient.put<Post>(`/posts/${post.id}`, post);
  return response.data;
};

export const deletePost = async (id: number): Promise<void> => {
  await apiClient.delete(`/posts/${id}`);
};
