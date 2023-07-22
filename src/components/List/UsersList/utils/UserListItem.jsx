import FlwBtn from "@/components/UI/FlwBtn";
import UserAvatar from "@/components/User/UserAvatar/UserAvatar";
import Link from "next/link";

export default function UserListItem({ myFollowings, myUserId, user }) {
  return (
    <div className="flex p-1 gap-2 items-center justify-between">
      <Link
        href={`/profile/${user?._id}`}
        className="overflow-hidden flex gap-2 items-center"
      >
        <UserAvatar size={32} src={user?.image} />

        <div className="flex flex-col">
          <p className="text-sm font-semibold">{user?.username}</p>
          <p className="text-sm text-neutral-500">{user?.email}</p>
        </div>
      </Link>
      {myUserId === user?._id ? null : !!!myUserId ? null : (
        <FlwBtn
          myFollowings={myFollowings}
          myUserId={myUserId}
          requestedUserId={user?._id}
        />
      )}
    </div>
  );
}
