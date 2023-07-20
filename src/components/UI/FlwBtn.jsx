"use client";
import { useFollowUser } from "@/hooks/users/RQUsers";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FlwBtn({ myFollowings, myUserId }) {
  const paramUserId = useParams()?.userId;
  const [isFollowing, setIsFollowing] = useState(false);

  const { mutate: followUser, data, isError, isLoading } = useFollowUser();

  console.log({ flwResponse: data?.data, myFollowings, myUserId });

  const handleFollow = () => {
    followUser({ myUserId, userId: paramUserId });
    setIsFollowing((prev) => !prev);
  };

  useEffect(() => {
    if (isError) setIsFollowing((prev) => !prev);
  }, [isError]);

  useEffect(() => {
    if (myFollowings && paramUserId) {
      const isFlwing = myFollowings?.includes(paramUserId);
      setIsFollowing(isFlwing);
    }
  }, [paramUserId, myFollowings]);

  return (
    <button
      onClick={handleFollow}
      disabled={!!!myFollowings || isLoading}
      className={`w-full px-2 py-1 ${
        isFollowing ? "bg-red-600" : "bg-sky-600"
      } font-semibold rounded-md hover:bg-opacity-40 hover:text-neutral-300 disabled:bg-neutral-600 disabled:cursor-not-allowed`}
    >
      {!!!myFollowings || isLoading
        ? "Loading..."
        : isFollowing
        ? "Unfollow"
        : "Follow"}
    </button>
  );
}
