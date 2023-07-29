"use client";
import { Fragment } from "react";
import PostCard from "../Posts/Card/PostCard";
import { usePostsByUserId } from "@/hooks/users/RQUsers";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function UserFeed() {
  const params = useParams();
  const { data: session } = useSession();

  const { data, isLoading, isError, error } = usePostsByUserId(params?.userId);

  if (isLoading)
    return (
      <div className="w-full flex flex-col gap-3 items-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  if (isError)
    return (
      <div className="w-full flex flex-col gap-3 items-center">
        <p className="text-lg">Error: {error?.message}</p>
      </div>
    );
  return (
    <div className="w-full flex flex-col gap-3 items-center">
      {data?.data?.length < 1 ? (
        <p className="text-lg">Nothing to show here</p>
      ) : (
        data?.data?.map((post, i) => (
          <Fragment key={i}>
            <PostCard myUserId={session?.user?.id} post={post} />
            <hr className="w-full my-1 border-zinc-900" />
          </Fragment>
        ))
      )}
    </div>
  );
}
