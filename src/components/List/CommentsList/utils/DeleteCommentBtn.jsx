import { useDeleteComment } from "@/hooks/comments/RQComments";
import { useSession } from "next-auth/react";

import { MdDeleteOutline } from "react-icons/md";

export default function DeleteCommentBtn({ commentId, postId }) {
  const { mutate: deleteComment, data } = useDeleteComment();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  console.log({ data, commentId, postId, userId });

  const handleDeletePost = () => {
    if (postId && commentId && userId) {
      deleteComment({ commentId, postId, userId });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Like Icon */}
      <div className="cursor-pointer" onClick={handleDeletePost}>
        <MdDeleteOutline size={16} />
      </div>
    </div>
  );
}
