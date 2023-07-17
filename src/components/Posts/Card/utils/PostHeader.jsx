import UserAvatar from "@/components/User/UserAvatar/UserAvatar";
import { iconCss } from "@/utils/css/cssClasses";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { MdMoreVert } from "react-icons/md";

const PostHeader = ({ userImage, userId, username, createdAt }) => {
  return (
    <div className="px-4 py-2 flex items-start justify-between">
      <Link href={`/profile/${userId}`} className="flex gap-2">
        <div>
          <UserAvatar src={userImage || "/user-avatar.png"} size={36} />
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="flex gap-1 text-sm">
            <p>{username}</p>
            {/* <span className="font-medium text-neutral-600"> • Following</span> */}
          </div>
          <p className="text-xs text-neutral-600">
            {formatDistanceToNow(new Date(createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </Link>
      <div className="flex gap-2">
        {/* Icons */}
        <div className={iconCss}>
          <MdMoreVert size={24} />
        </div>
      </div>
    </div>
  );
};
export default PostHeader;
