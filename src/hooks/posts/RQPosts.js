"use client";
import axios from "axios";
import { likePostRoute, postsRoute } from "@/services/routes";
import { useMutation, useQuery, useQueryClient } from "react-query";

const fetchPosts = () => axios.get(postsRoute);

const addPost = (post) => axios.post(postsRoute, post);

const deletePost = (postId) => axios.delete(`${postsRoute}/${postId}`);

const updatePost = ({ postId, updatedPost }) =>
  axios.put(`${postsRoute}/${postId}`, updatedPost);

const likePost = ({ userId, postId }) =>
  axios.post(`${postsRoute}/${postId}/like`, { userId });

export function usePosts() {
  return useQuery("posts", fetchPosts, { staleTime: 30 * 1000 });
}

export function useAddPost() {
  const queryClient = useQueryClient();
  return useMutation("add-post", addPost, {
    onSuccess: () => queryClient.invalidateQueries("posts"),
  });
}

export function useLikePost() {
  return useMutation("like-post", likePost, { retry: 1 });
}
