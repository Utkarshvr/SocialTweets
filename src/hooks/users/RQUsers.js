"use client";
import axios from "axios";
import { userRoute } from "@/services/routes";
import { useMutation, useQueries, useQuery } from "react-query";

const fetchUserById = (userId) => axios.get(`${userRoute}/${userId}`);

const fetchPostsByUserId = (userId) =>
  axios.get(`${userRoute}/${userId}/posts`);

const followUser = ({ userId, myUserId }) =>
  axios.post(`${userRoute}/${userId}/follow`, { userId: myUserId });

export function useUserById(userId) {
  return useQuery("users", () => fetchUserById(userId));
}

export function useMyProfile() {
  return useMutation("my-profile", fetchUserById);
}

export function useUsersByList(userList) {
  return useQueries(
    userList?.map((id) => ({
      queryKey: ["users", id],
      queryFn: () => fetchUserById(id),
    }))
  );
}

export function usePostsByUserId(userId) {
  return useQuery("users-posts", () => fetchPostsByUserId(userId));
}

export function useFollowUser() {
  return useMutation("follow-user", followUser, { retry: 1 });
}
