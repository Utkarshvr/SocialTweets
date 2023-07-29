"use client";
import { useFollowUser } from "@/hooks/users/RQUsers";
import { useEffect, useState } from "react";

export default function FlwBtn({
  myFollowings,
  myUserId,
  requestedUserId,
  fullWidth,
}) {
  const [isFollowing, setIsFollowing] = useState(false);

  const { mutate: followUser, data, isError, isLoading } = useFollowUser();

  const handleFollow = () => {
    followUser({ myUserId, userId: requestedUserId });
    setIsFollowing((prev) => !prev);
  };

  useEffect(() => {
    if (isError) setIsFollowing((prev) => !prev);
  }, [isError]);

  useEffect(() => {
    if (myFollowings && requestedUserId) {
      const isFlwing = myFollowings?.includes(requestedUserId);
      setIsFollowing(isFlwing);
    }
  }, [requestedUserId, myFollowings]);

  return (
    <button
      onClick={handleFollow}
      disabled={!!!myFollowings || isLoading}
      className={`${fullWidth ? "w-full" : "h-max"} px-2 py-1 ${
        isFollowing ? "bg-red-600" : "bg-sky-600"
      } font-semibold rounded-md hover:bg-opacity-40 hover:text-neutral-300 disabled:bg-neutral-600 disabled:cursor-not-allowed`}
    >
      {!!!myFollowings || isLoading
        ? "Wait..."
        : isFollowing
        ? "Unfollow"
        : "Follow"}
    </button>
  );
}
