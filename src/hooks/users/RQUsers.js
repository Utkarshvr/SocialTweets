"use client";
import axios from "axios";
import { userRoute } from "@/services/routes";
import { useMutation, useQuery, useQueryClient } from "react-query";

const fetchUserById = (userId) => axios.get(`${userRoute}/${userId}`);

const followUser = ({ userId, postId }) =>
  axios.post(`${userRoute}/${userId}/follow`, { userId });

export function usePosts() {
  return useQuery("posts", fetchPosts, { staleTime: 30 * 1000 });
}

export function useAddPost() {
  const queryClient = useQueryClient();
  return useMutation("add-post", fetchUserById);
}

export function useFollowUser() {
  return useMutation("follow-user", followUser, { retry: 1 });
}
