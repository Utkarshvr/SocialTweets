"use client";
import { Fragment } from "react";
import PostCard from "../Posts/Card/PostCard";
import { usePosts } from "@/hooks/posts/RQPosts";

export default function Feed() {
  const { data, isLoading, isError, error } = usePosts();
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
            <PostCard post={post} />
            <hr className="w-full my-1 border-zinc-900" />
          </Fragment>
        ))
      )}
    </div>
  );
}
