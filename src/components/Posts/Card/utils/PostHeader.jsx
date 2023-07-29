import PostMenu from "@/components/Menu/PostMenu/PostMenu";
import UserAvatar from "@/components/User/UserAvatar/UserAvatar";
// import { iconCss } from "@/utils/css/cssClasses";
// import { MdMoreVert } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

const PostHeader = ({
  postId,
  myUserId,
  userImage,
  userId,
  username,
  followers,
  createdAt,
}) => {
  return (
    <div className="px-4 py-2 flex items-start justify-between">
      <Link href={`/profile/${userId}`} className="flex gap-2">
        <div>
          <UserAvatar src={userImage || "/user-avatar.png"} size={36} />
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="flex gap-1 text-sm">
            <p>{username}</p>
            {followers?.includes(myUserId) && (
              <span className="font-semibold text-neutral-500">
                {" "}
                • Following
              </span>
            )}
          </div>
          <p className="text-xs text-neutral-600">
            {formatDistanceToNow(new Date(createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </Link>
      <div className="flex gap-2">
        {/* Others */}
        {myUserId === userId && <PostMenu postId={postId} />}
      </div>
    </div>
  );
};
export default PostHeader;
