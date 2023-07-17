import { useLikePost } from "@/hooks/posts/RQPosts";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { MdComment, MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { iconCss } from "@/utils/css/cssClasses";

const PostActions = ({ postId, postLikes }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isLiked, setIsLiked] = useState(false);
  const { mutate: likePost, data, isError } = useLikePost();

  const handleLikePost = () => {
    likePost({ postId, userId });
    setIsLiked((prev) => !prev);
  };
  useEffect(() => {
    setIsLiked(postLikes?.includes(userId?.toString()));
  }, [session]);

  useEffect(() => {
    setIsLiked((prev) => !prev);
  }, [isError]);

  console.log({ data });

  return (
    <div className="flex gap-4 items-center justify-end px-4 py-2">
      <div onClick={() => handleLikePost()} className={iconCss}>
        {isLiked ? (
          <MdFavorite color="red" size={24} />
        ) : (
          <MdFavoriteBorder size={24} />
        )}
      </div>
      <div className={iconCss}>
        <MdComment size={24} />
      </div>
    </div>
  );
};
export default PostActions;
