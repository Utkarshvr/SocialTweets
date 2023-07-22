"use client";
import UserAvatar from "@/components/User/UserAvatar/UserAvatar";
import { formatDistanceToNow } from "date-fns";
import Content from "@/components/Layouts/Content/Content";

export default function CommentListItem({ comment }) {
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
    </div>
  );
}
