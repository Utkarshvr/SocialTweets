"use client";
import axios from "axios";
import { userRoute } from "@/services/routes";
import { useMutation, useQuery } from "react-query";

const fetchUserById = (userId) => axios.get(`${userRoute}/${userId}`);

const fetchPostsByUserId = (userId) =>
  axios.get(`${userRoute}/${userId}/posts`);

const followUser = ({ userId, myUserId }) =>
  axios.post(`${userRoute}/${userId}/follow`, { userId: myUserId });

export function useUserById(userId) {
  return useQuery("get-users", () => fetchUserById(userId));
}

export function useMyProfile() {
  return useMutation("get-my-profile", fetchUserById);
}

export function usePostsByUserId(userId) {
  return useQuery("get-users-posts", () => fetchPostsByUserId(userId));
}

export function useFollowUser() {
  return useMutation("follow-user", followUser, { retry: 1 });
}
