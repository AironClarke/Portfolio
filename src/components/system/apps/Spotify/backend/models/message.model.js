import mongoose from 'mongoose';
import { type } from 'os';

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: String,
      required: true
    },
    receiverId: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export const Message = mongoose.model('Message', messageSchema);
