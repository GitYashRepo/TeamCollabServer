import mongoose from "mongoose";

const CommentSchema = mongoose.Schema(
  {
    text: { type: String, required: true, trim: true },
    taskId: { type: Schema.Types.ObjectId, ref: "Task", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
