import React from "react";
import { MdComment, MdFavorite } from "react-icons/md";

export default function PostInfoBar({ postLikes, numComments }) {
  return (
    <div className="my-2 flex gap-2 items-center ml-auto w-max">
      <div className="flex text-xs items-center gap-2">
        <p className="text-gray-400 font-medium">{postLikes?.length} likes</p>
        <MdFavorite color="red" size={12} />
      </div>
      <div className="flex text-xs items-center gap-2">
        <p className="text-gray-400 font-medium">{numComments} comments</p>
        <MdComment color="gray" size={12} />
      </div>
    </div>
  );
}
