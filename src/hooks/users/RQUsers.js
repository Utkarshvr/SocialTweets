"use client";
import axios from "axios";
import { userRoute } from "@/services/routes";
import { useMutation, useQuery, useQueryClient } from "react-query";

const fetchUserById = (userId) => axios.get(`${userRoute}/${userId}`);

const followUser = ({ userId, myUserId }) =>
  axios.post(`${userRoute}/${userId}/follow`, { userId: myUserId });

export function useUserById() {
  return useQuery("get-users", fetchUserById);
}

export function useFollowUser() {
  return useMutation("follow-user", followUser, { retry: 1 });
}
