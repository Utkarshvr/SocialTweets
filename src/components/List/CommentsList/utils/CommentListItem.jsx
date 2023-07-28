"use client";
import UserAvatar from "@/components/User/UserAvatar/UserAvatar";
import { formatDistanceToNow } from "date-fns";
import Content from "@/components/Layouts/Content/Content";
import LikeCommentBtn from "./LikeCommentBtn";
import DeleteCommentBtn from "./DeleteCommentBtn";
import { useSession } from "next-auth/react";

export default function CommentListItem({ comment, postId }) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const creatorId = comment?.creator?._id;

  return (
    <div className="flex gap-2">
      <div className="min-w-[10%]">
        <UserAvatar src={comment?.creator?.image} size={36} />
      </div>
      <div className="w-full flex flex-col">
        <div className="flex items-center flex-wrap gap-1 text-sm">
          <p className="font-medium text-neutral-300">
            {comment?.creator?.email || "unkown"}
          </p>
          <p className="text-neutral-500 text-xs">
            {formatDistanceToNow(new Date(comment?.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
        <Content body={comment?.comment} />
      </div>

      {/* Don't show delete for other user's comment */}
      {userId === creatorId && (
        <DeleteCommentBtn postId={postId} commentId={comment?._id} />
      )}
      <LikeCommentBtn commentId={comment?._id} commentLikes={comment?.likes} />
    </div>
  );
}
