"use client";
import axios from "axios";
import { postsRoute } from "@/services/routes";
import { useMutation, useQuery, useQueryClient } from "react-query";

const fetchComments = (postId) => axios.get(`${postsRoute}/${postId}/comments`);

const addComment = ({ comment, userId, postId }) =>
  axios.post(`${postsRoute}/${postId}/comments`, { comment, userId });

// const deletePost = (postId) => axios.delete(`${postsRoute}/${postId}`);

// const updatePost = ({ postId, updatedPost }) =>
//   axios.put(`${postsRoute}/${postId}`, updatedPost);

// const likeComment = ({ userId, postId }) =>
//   axios.post(`${postsRoute}/${postId}/comment/like`, { userId });

export function useComments(postId) {
  return useQuery(["comments", postId], () => fetchComments(postId), {
    // staleTime: 1000 * 60 * 1,
  });
}

export function useAddComment() {
  const queryClient = useQueryClient();
  return useMutation("add-comment", addComment, {
    onSuccess: () => queryClient.invalidateQueries("comments"),
  });
}

// export function useLikePost() {
//   return useMutation("like-post", likePost, { retry: 1 });
// }
