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

const TodoItem = mongoose.model('TodoItem', todoItemSchema);


export default TodoItem;
