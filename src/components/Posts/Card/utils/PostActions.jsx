import { useLikePost } from "@/hooks/posts/RQPosts";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { MdComment, MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { iconCss } from "@/utils/css/cssClasses";

const PostActions = ({ postId, postLikes }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isLiked, setIsLiked] = useState(false);
  const [postLikesState, setPostLikesState] = useState([]);
  const { mutate: likePost, data, isError } = useLikePost();
  // console.log({ isLiked });

  const handleLikePost = () => {
    // console.log("Inside Handler");

    likePost({ postId, userId });
    setIsLiked((prev) => !prev);
  };

  useEffect(() => {
    // console.log("Inside State Likes Effect");

    if (session && postLikesState) {
      const isLikeIncluded = postLikesState?.includes(userId?.toString());
      // console.log({ postLikesState, userId, isLikeIncluded });
      setIsLiked(isLikeIncluded);
    }
  }, [session, postLikesState]);

  useEffect(() => {
    // console.log("Inside Default Likes Effect");

    if (postLikes) setPostLikesState(postLikes);

    const isLikeIncluded = postLikes?.includes(userId?.toString());
    // console.log({ postLikes, userId, isLikeIncluded });
    setIsLiked(isLikeIncluded);
  }, [postLikes]);

  useEffect(() => {
    if (isError) {
      // console.log("Inside isError Effect");
      setIsLiked((prev) => !prev);
    }
  }, [isError]);

  // console.log({
  //   likeRes: data?.data,
  //   postLikes,
  //   userId: userId?.toString(),
  // });

  return (
    <div className="flex gap-4 items-center justify-end px-4 py-2">
      <div onClick={handleLikePost} className={iconCss}>
        {isLiked ? (
          <MdFavorite color="red" size={24} />
        ) : (
          <MdFavoriteBorder
            color={`${!!!session?.user ? "gray" : ""}`}
            size={24}
          />
        )}
      </div>
      <div className={iconCss}>
        <MdComment size={24} />
      </div>
    </div>
  );
};
export default PostActions;
