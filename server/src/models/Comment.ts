import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IComment extends Document {
  text: string;
  taskId: Types.ObjectId;
  userId: Types.ObjectId;
}

const CommentSchema = new Schema<IComment>(
  {
    text: { type: String, required: true, trim: true },
    taskId: { type: Schema.Types.ObjectId, ref: "Task", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

const Comment: Model<IComment> = mongoose.model<IComment>("Comment", CommentSchema);
export default Comment;
