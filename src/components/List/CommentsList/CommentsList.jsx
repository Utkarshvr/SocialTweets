"use client";
import { useComments } from "@/hooks/comments/RQComments";
import CommentListItem from "./utils/CommentListItem";

export default function CommentsList({ postId }) {
  const { data: comments, isLoading } = useComments(postId);
  console.log(comments?.data);

  if (isLoading)
    return (
      <div className="w-full flex flex-col items-center">
        <p className="text-lg">Loading...</p>
      </div>
    );

  return comments?.data?.length > 0 ? (
    comments?.data.map((comment, i) => (
      <div key={comment?._id}>
        <CommentListItem postId={postId} comment={comment} />
        {i + 1 !== comments?.data?.length && (
          <hr className="w-full my-2 border-zinc-900" />
        )}
      </div>
    ))
  ) : (
    <p className="text-sm text-neutral-500">No comments yet</p>
  );
}
