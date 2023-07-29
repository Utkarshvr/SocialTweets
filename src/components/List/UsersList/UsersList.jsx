"use client";

import { useMyProfile, useUsersByList } from "@/hooks/users/RQUsers";
import UserListItem from "./utils/UserListItem";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function UsersList({ users }) {
  const usersList = useUsersByList(users);

  const { data: session } = useSession();
  const { data: myProfile, mutate: getMyProfile } = useMyProfile();

  useEffect(() => {
    if (session?.user?.id) getMyProfile(session?.user?.id);
  }, [session]);

  return (
    <div>
      {usersList?.map(
        ({ data, isError }, index) =>
          !isError && (
            <UserListItem
              key={index}
              myFollowings={myProfile?.data?.followings}
              myUserId={session?.user?.id}
              user={data?.data}
            />
          )
      )}
    </div>
  );
}
