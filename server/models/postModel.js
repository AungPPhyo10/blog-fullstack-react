import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PostSchema = mongoose.Schema({
  title: {type: String, required: true},
  summary: {type: String, required: true},
  content: {type: String, required: true},
  cover: {type: String, required: true},
  author: {type: Schema.Types.ObjectId, ref: 'User'},
}, {
  timestamps: true,
})

// make a mongoose model from the schema
const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;