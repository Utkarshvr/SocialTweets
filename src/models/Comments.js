import { Schema, model, models } from "mongoose";

const CommentSchema = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: "Posts",
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    //   Additional
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Comments = models.Comments || model("Comments", CommentSchema);
export default Comments;
