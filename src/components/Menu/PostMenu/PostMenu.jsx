"use client";
import { CiMenuKebab } from "react-icons/ci";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useDeletePost } from "@/hooks/posts/RQPosts";

const linkStyle = `cursor-pointer hover:opacity-70`;

export default function PostMenu({ postId }) {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [open, setOpen] = useState(false);

  const { mutate: delPost, data } = useDeletePost();

  const handleDelete = () => {
    delPost({ postId, userId });
  };

  const handleEdit = async () => {
    // onOpen(postId);
  };

  return (
    <div className="relative">
      <div
        onClick={() => setOpen((prev) => !prev)}
        tabIndex="0"
        onBlur={() => setOpen(false)}
        className="cursor-pointer p-1 rounded-full bg-neutral-600 bg-opacity-20"
      >
        <CiMenuKebab size={20} />
      </div>
      <ul
        className={`absolute ${
          !open && "opacity-0"
        } transition-all ease-in translate-y-1 text-right top-[100%] right-1 flex flex-col gap-1 py-2 px-4 bg-neutral-900 rounded-md`}
      >
        {/* <li onClick={handleEdit} className={linkStyle}>
          Edit
        </li> */}
        <li onClick={handleDelete} className={linkStyle}>
          Delete
        </li>
      </ul>
    </div>
  );
}
