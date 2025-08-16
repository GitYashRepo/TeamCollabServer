import Task from "../Models/Task";
import Comment from "../Models/Comment";
import authMiddleware, {  } from "../Middleware/Auth";

/**
 * @route POST /tasks
 * @desc Create a new task
 */
const CreateNewTask = async (req , res ) => {
    try {
      const { title, description, assignedTo } = req.body;

      const task = new Task({
        title,
        description,
        status: "pending",
        createdBy: req.user.id,
        assignedTo,
      });

      await task.save();
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }

/**
 * @route GET /tasks
 * @desc Get tasks for logged-in user, optional filter by status
 */
const GetTasks = async (req , res ) => {
  try {
    const status = req.query.status

    const query = {
      $or: [{ createdBy: req.user.id }, { assignedTo: req.user.id }],
    };

    if (status) {
      query.status = status;
    }

    const tasks = await Task.find(query)
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email");

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/**
 * @route PUT /tasks/:id
 * @desc Update task details or status
 */
const UpdateTask = async (req , res ) => {
  try {
    const { id } = req.params;
    const { title, description, status, assignedTo } = req.body;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Only task creator or assigned user can update
    if (
      task.createdBy.toString() !== req.user.id &&
      task.assignedTo?.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    if (assignedTo) task.assignedTo = assignedTo;

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/**
 * @route POST /tasks/:id/comments
 * @desc Add comment to a task
 */
const AddComment = async (req , res ) => {
    try {
      const { id } = req.params;
      const { text } = req.body;

      const task = await Task.findById(id);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      const comment = new Comment({
        text,
        taskId: id,
        userId: req.user.id,
      });

      await comment.save();
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };

/**
 * @route GET /tasks/:id/comments
 * @desc Get comments for a task
 */
const GetComments = async (req , res ) => {
    try {
      const { id } = req.params;

      const comments = await Comment.find({ taskId: id }).populate(
        "userId",
        "name email"
      );

      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };



export {
    CreateNewTask,
    GetTasks,
    UpdateTask,
    AddComment,
    GetComments
}
