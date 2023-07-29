import { useLikePost } from "@/hooks/posts/RQPosts";
import { useEffect, useState } from "react";
import { MdComment, MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { iconCss } from "@/utils/css/cssClasses";
import { useCommentsAPI } from "../context/CommentsProvider";

const PostActions = ({ postId, postLikes, myUserId }) => {
  // For opening Comments Section
  const { onOpen, onClose } = useCommentsAPI();
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false);

  const [isLiked, setIsLiked] = useState(false);
  const [postLikesState, setPostLikesState] = useState([]);
  const { mutate: likePost, data, isError } = useLikePost();
  // console.log({ isLiked });

  const handleLikePost = () => {
    // console.log("Inside Handler");
    if (myUserId) {
      likePost({ postId, userId: myUserId });
      setIsLiked((prev) => !prev);
    } else {
      setIsLiked(false);
    }
  };

  useEffect(() => {
    if (myUserId && postLikesState) {
      const isLikeIncluded = postLikesState?.includes(myUserId);
      setIsLiked(isLikeIncluded);
    }
  }, []);

  useEffect(() => {
    // console.log("Inside Default Likes Effect");

    if (postLikes) setPostLikesState(postLikes);

    const isLikeIncluded = postLikes?.includes(myUserId);
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
  //   myUserId,
  // });

  return (
    <div className="flex gap-4 items-center justify-end px-4 py-2">
      <div onClick={handleLikePost} className={iconCss}>
        {isLiked ? (
          <MdFavorite color="red" size={24} />
        ) : (
          <MdFavoriteBorder color={`${myUserId ? "gray" : ""}`} size={24} />
        )}
      </div>
      <div
        onClick={() => {
          if (isCommentSectionOpen) onClose();
          else onOpen({ postId });
          setIsCommentSectionOpen((prev) => !prev);
        }}
        className={iconCss}
      >
        <MdComment size={24} />
      </div>
    </div>
  );
};
export default PostActions;
