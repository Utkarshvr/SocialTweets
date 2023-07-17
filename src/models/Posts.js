import { Schema, model, models } from "mongoose";

const PostSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    //   Additional
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Posts = models.Posts || model("Posts", PostSchema);
export default Posts;
