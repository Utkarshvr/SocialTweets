"use client";
import axios from "axios";
import { postsRoute, commentsRoute } from "@/services/routes";
import { useMutation, useQuery, useQueryClient } from "react-query";

const fetchComments = (postId) => axios.get(`${postsRoute}/${postId}/comments`);

const addComment = ({ comment, userId, postId }) =>
  axios.post(`${postsRoute}/${postId}/comments`, { comment, userId });

const deleteComment = ({ userId, postId, commentId }) =>
  axios.delete(`${commentsRoute}/${commentId}`, { data: { userId, postId } });

// const updatePost = ({ postId, updatedPost }) =>
//   axios.put(`${postsRoute}/${postId}`, updatedPost);

const likeComment = ({ userId, commentId }) =>
  axios.post(`${commentsRoute}/${commentId}/like`, { userId });

export function useComments(postId) {
  return useQuery(["comments", postId], () => fetchComments(postId), {
    staleTime: 1000 * 60 * 1,
  });
}

export function useAddComment() {
  const queryClient = useQueryClient();
  return useMutation("add-comment", addComment, {
    onSuccess: () => queryClient.invalidateQueries("comments"),
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation("delete-comment", deleteComment, {
    retry: 1,
    onSuccess: () => queryClient.invalidateQueries("comments"),
  });
}

export function useLikeComment() {
  return useMutation("like-comment", likeComment, { retry: 1 });
}
