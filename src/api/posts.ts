import axios from "axios";
import type { Post } from "../types";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await api.get<Post[]>("/posts");
  console.log(response, "hello");
  return response.data;
};

export const fetchPost = async (id: number): Promise<Post> => {
  const response = await api.get<Post>(`/posts/${id}`);
  return response.data;
};

export const createPost = async (post: Omit<Post, "id">): Promise<Post> => {
  const response = await api.post<Post>("/posts", post);
  return response.data;
};

export const updatePost = async (post: Post): Promise<Post> => {
  const response = await api.put<Post>(`/posts/${post.id}`, post);
  return response.data;
};

export const deletePost = async (id: number): Promise<void> => {
  await api.delete(`/posts/${id}`);
};
