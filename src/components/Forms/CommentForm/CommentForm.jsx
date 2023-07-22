"use client";
import HelperText from "@/components/UI/HelperText";
import UserAvatar from "@/components/User/UserAvatar/UserAvatar";
import { useAddComment } from "@/hooks/comments/RQComments";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

const Input = ({ postId, userId }) => {
  const ref = useRef();
  const [error, setError] = useState(null);
  // Mutation Hook
  const { mutate: postComment, isLoading, isSuccess } = useAddComment();

  const onSubmit = (e) => {
    e.preventDefault();
    setError(null);
    const comment = ref?.current?.value;
    // console.log({ comment, userId, postId });

    if (comment?.length > 0 && postId && userId) {
      console.log("I reached inside");
      postComment({ comment, userId, postId });
    } else setError("Comment can't be empty");
  };

  useEffect(() => {
    if (isSuccess && ref?.current?.value) {
      ref.current.value = "";
    }
  }, [isSuccess]);

  return (
    <form
      onSubmit={onSubmit}
      className="flex gap-2 items-center justify-between"
    >
      <div className="w-full">
        <textarea
          ref={ref}
          disabled={!!!userId}
          placeholder="Add a comment..."
          type="text"
          className="w-full resize-none p-2 text-sm bg-transparent border-b border-neutral-600"
        />
        <HelperText error={error} />
      </div>
      <button
        type="submit"
        disabled={isLoading || !!!userId}
        className={`px-2 py-1 w-max bg-sky-600 font-medium rounded-md hover:bg-sky-700 disabled:bg-neutral-800 disabled:cursor-not-allowed`}
      >
        {isLoading ? "Posting..." : "Post"}
      </button>
    </form>
  );
};

export default function CommentForm({ postId }) {
  const { data: session } = useSession();

  return (
    <div className="w-full flex gap-2">
      <div className="min-w-[10%]">
        <UserAvatar src={session?.user?.image} size={36} />
      </div>
      <div className="w-full flex flex-col gap-2">
        <Input postId={postId} userId={session?.user?.id} />
      </div>
    </div>
  );
}
