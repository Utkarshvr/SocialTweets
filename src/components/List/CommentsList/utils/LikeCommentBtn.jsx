import { useLikeComment } from "@/hooks/comments/RQComments";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

export default function LikeCommentBtn({ commentId, commentLikes }) {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isLiked, setIsLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(0);

  const { mutate: likeComment, data, isError } = useLikeComment();

  const handleLikePost = () => {
    if (userId) {
      likeComment({ commentId, userId });
      isLiked
        ? setNumLikes((prev) => prev - 1)
        : setNumLikes((prev) => prev + 1);
      setIsLiked((prev) => !prev);
    } else {
      setIsLiked(false);
    }
  };

  useEffect(() => {
    if (commentLikes) {
      setNumLikes(commentLikes?.length);
      const checkIsLiked = commentLikes?.includes(userId);
      setIsLiked(checkIsLiked);
    }
  }, [commentLikes]);

  useEffect(() => {
    if (isError) {
      setIsLiked((prev) => !prev);
    }
  }, [isError]);

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Like Icon */}
      <div className="cursor-pointer" onClick={handleLikePost}>
        {isLiked ? (
          <MdFavorite color="red" size={16} />
        ) : (
          <MdFavoriteBorder
            color={`${!!!session?.user ? "gray" : ""}`}
            size={16}
          />
        )}
      </div>
      {numLikes > 0 && <p className="text-neutral-400 text-xs">{numLikes}</p>}
    </div>
  );
}
