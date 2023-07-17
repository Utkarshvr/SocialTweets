"use client";
import FlwBtn from "@/components/UI/FlwBtn";
import UserAvatar from "@/components/User/UserAvatar/UserAvatar";
import { useParams } from "next/navigation";

export default function UserLongCard() {
  const param = useParams();
  console.log(param);
  return (
    <div className="relative p-7 rounded-md flex flex-col gap-4 items-center justify-center bg-neutral-900">
      {/* Avatar */}
      <UserAvatar
        size={64}
        src={"/user-avatar.png"}
        extraStyle="absolute top-0 left-[50%] translate-x-[-50%]  translate-y-[-75%]"
      />

      {/* Details */}
      <div className="flex flex-col items-center justify-center">
        <p className="text-md font-semibold">Utkarsh Verma</p>
        <p className="text-md text-neutral-400">utkarshv995@gmail.com</p>
        <p className="text-md text-neutral-400">1 Posts</p>
      </div>

      {/* Action */}
      <FlwBtn />
    </div>
  );
}
