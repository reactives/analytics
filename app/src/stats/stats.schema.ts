import * as mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;
export const StatSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  clientId: {
    type: String,
  },
  viewportSize: {
    required: true,
    type: String,
  },
  language: {
    required: true,
    type: String,
  },
  hitType: {
    required: true,
    type: String,
  },
  userAgent: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: Date,
  },
  trackingId: {
    type: ObjectId,
    ref: 'Sit'
  }
});

