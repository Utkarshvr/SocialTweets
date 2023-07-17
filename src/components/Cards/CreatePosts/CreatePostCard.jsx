"use client";

import UserAvatar from "@/components/User/UserAvatar/UserAvatar";
import { useModalAPI } from "@/context/ModalProvider/PostModalProvider";
import { useSession } from "next-auth/react";

export default function CreatePostCard() {
  const { data: session } = useSession();
  const { onOpen } = useModalAPI();
  return (
    <div className="w-full flex items-center justify-center gap-4 p-4">
      <UserAvatar src={session?.user?.image} size={44} />
      <div
        onClick={() => onOpen()}
        className="p-2 px-4 w-[90%] transition-all rounded-full text-md font-semibold border-2 cursor-pointer border-white hover:bg-white hover:bg-opacity-20"
      >
        Start a post
      </div>
    </div>
  );
}
