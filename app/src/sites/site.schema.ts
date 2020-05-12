import * as mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;
export const SiteSchema = new mongoose.Schema({
  host: {
    type: String,
    required: true
  },
  siteName: {
    type: String,
    required: true
  },
  userId: {
    type: ObjectId,
    ref: 'User'
  }
});
