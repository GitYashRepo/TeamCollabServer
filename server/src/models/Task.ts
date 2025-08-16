import mongoose, { Schema, Document, Model, Types } from "mongoose";

export type TaskStatus = "pending" | "completed";

export interface ITask extends Document {
  title: string;
  description?: string;
  status: TaskStatus;
  createdBy: Types.ObjectId;
  assignedTo?: Types.ObjectId;
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    status: { type: String, enum: ["pending", "completed"], default: "pending" },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

const Task: Model<ITask> = mongoose.model<ITask>("Task", TaskSchema);
export default Task;
