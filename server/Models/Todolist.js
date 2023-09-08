import mongoose from "mongoose";

const todoItemSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
});

// Create a unique compound index on 'title' and 'description'
todoItemSchema.index({ title: 1, description: 1 }, { unique: true });

const TodoItem = mongoose.model('TodoItem', todoItemSchema);

export default TodoItem;
