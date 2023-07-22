import CommentForm from "@/components/Forms/CommentForm/CommentForm";
import CommentsList from "@/components/List/CommentsList/CommentsList";
import { useCommentsData } from "../context/CommentsProvider";

export default function PostComments({ postId }) {
  const { showComments } = useCommentsData();

  if (showComments)
    return (
      <div className="flex flex-col gap-4 items-center px-4 py-2">
        {/* Form */}
        <CommentForm postId={postId} />

        {/* Comments */}
        <div className="w-full">
          <p className="text-sm font-semibold text-neutral-500 my-2">
            Comments
          </p>
          <div className="flex max-h-[300px] overflow-y-scroll flex-col gap-3">
            <CommentsList postId={postId} />
          </div>
        </div>
      </div>
    );
}
