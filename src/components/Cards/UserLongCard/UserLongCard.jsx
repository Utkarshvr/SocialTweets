"use client";
import FlwBtn from "@/components/UI/FlwBtn";
import UserAvatar from "@/components/User/UserAvatar/UserAvatar";
import { useModalAPI } from "@/context/ModalProvider/PostModalProvider";
import { useMyProfile, useUserById } from "@/hooks/users/RQUsers";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function UserLongCard() {
  const param = useParams();
  const { data: session } = useSession();
  const { onOpen } = useModalAPI();

  const { data, isLoading, isError, error } = useUserById(param?.userId);
  const { data: myProfile, mutate: getMyProfile } = useMyProfile();

  useEffect(() => {
    if (session?.user?.id) getMyProfile(session?.user?.id);
  }, [session]);

  if (isLoading)
    return (
      <div className="relative p-7 rounded-md flex flex-col gap-4 items-center justify-center bg-neutral-900">
        <p className="text-lg">Loading...</p>
      </div>
    );
  if (isError)
    return (
      <div className="relative p-7 rounded-md flex flex-col gap-4 items-center justify-center bg-neutral-900">
        <p className="text-lg">Error: {error?.message}</p>
      </div>
    );
  return (
    <div className="relative p-4 rounded-md flex flex-col gap-4 items-center justify-center bg-neutral-900">
      {/* Avatar */}
      <UserAvatar
        size={64}
        src={data?.data?.image}
        extraStyle="absolute top-0 left-[50%] translate-x-[-50%]  translate-y-[-75%]"
      />

      {/* Details */}
      <div className="flex flex-col items-center justify-center">
        <p className="text-md font-semibold">{data?.data?.username}</p>
        <p className="text-md text-neutral-400">{data?.data?.email}</p>

        {/* Other Details */}
        <div className="p-2 my-2 rounded-md flex gap-2 items-center justify-center bg-neutral-700">
          <div className="flex gap-2 items-center justify-center text-md">
            <p className="font-semibold">{data?.data?.numPosts}</p>
            <p>Posts</p>
          </div>
          <div
            style={{
              border: "1px solid white",
              height: "20px",
            }}
          />
          <div
            onClick={() => onOpen("FOLLOWERS_LIST", data?.data?.followers)}
            className="cursor-pointer flex gap-2 items-center justify-center text-md"
          >
            <p className="font-semibold"> {data?.data?.followers?.length}</p>
            <p>Followers</p>
          </div>
          <div
            style={{
              border: "1px solid white",
              height: "20px",
            }}
          />
          <div
            onClick={() => onOpen("FOLLOWING_LIST", data?.data?.followings)}
            className="cursor-pointer flex gap-2 items-center justify-center text-md"
          >
            <p className="font-semibold">{data?.data?.followings?.length}</p>
            <p>Following</p>
          </div>
        </div>
        <p className="text-md text-sky-600 font-semibold">
          {data?.data?.followings?.includes(session?.user?.id) && "Follows you"}
          {session?.user?.id === param?.userId && "Your Profile"}
        </p>
      </div>

      {/* Action */}
      {session?.user?.id === param?.userId ? null : !!!session?.user ? null : (
        <FlwBtn
          fullWidth
          myFollowings={myProfile?.data?.followings}
          myUserId={session?.user?.id}
          requestedUserId={param?.userId}
        />
      )}
    </div>
  );
}
