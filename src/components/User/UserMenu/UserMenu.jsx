"use client";

import UserAvatar from "@/components/User/UserAvatar/UserAvatar";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const linkStyle = `cursor-pointer hover:text-sky-600`;

const DropDown = ({ user, open, close }) => {
  const handleLogout = () => {
    signOut();
  };

  return (
    <ul
      className={`absolute w-64 ${
        !open ? "opacity-0 collapse" : "opacity-100 visible"
      }  transition-all ease-in translate-y-1 text-center top-[100%] right-1 flex flex-col gap-1 py-2 px-4 bg-neutral-900 rounded-md`}
    >
      <li>
        <Link href={`/profile/${user?.id}`} className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="flex shrink-0 items-start">
              <UserAvatar size={40} src={user?.image} />
            </div>
            <div className="flex">
              <p className="font-semibold text-md">{user?.name}</p>
            </div>
          </div>
          <button
            className={`hover:bg-sky-500 hover:bg-opacity-20 border-2 border-sky-600 text-sky-600 rounded-full px-5 py-0.5`}
          >
            View Profile
          </button>
        </Link>
      </li>
      <li onClick={handleLogout} className={linkStyle}>
        Logout
      </li>
    </ul>
  );
};

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  console.log({ session });

  const close = () => setOpen(false);

  if (session?.user)
    return (
      <div tabIndex="0" onBlur={() => setOpen(false)} className="relative">
        <span
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-full cursor-pointer"
        >
          <UserAvatar src={session?.user?.image} />
        </span>
        <DropDown user={session?.user} open={open} close={close} />
      </div>
    );
  else
    return (
      <button
        className="font-semibold text-md text-sky-500 "
        onClick={() => signIn("google")}
      >
        Sign In
      </button>
    );
}
