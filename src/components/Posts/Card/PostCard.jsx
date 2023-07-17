"use client";

import PostHeader from "./utils/PostHeader";
import PostContent from "./utils/PostContent";
import PostImg from "./utils/PostImg";
import PostActions from "./utils/PostActions";

/*
isExpanded: FALSE
=> p.text
1. max-h-[60px]
2. overflow: hidden
3. render "...see more" Button
4. Remove break-spaces

isExpanded: TRUE
=> p.text
1. max-h-none
2. overflow: visibile
3. remove "...see more" Button
4. Add break-spaces

*/

export default function PostCard({ post }) {
  return (
    <div id={post?._id} className="flex w-full flex-col">
      {/* Header */}
      <PostHeader
        userId={post?.creator?._id}
        userImage={post?.creator?.image}
        username={post?.creator?.username}
        createdAt={post?.createdAt}
      />
      {/* Content */}
      <PostContent body={post?.body} />

      {/* Image */}
      {post?.image && <PostImg postImage={post?.image} />}

      {/* Actions */}
      <PostActions postId={post?._id} postLikes={post?.likes} />
    </div>
  );
}
