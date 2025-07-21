import mongoose from 'mongoose';

const PostSchema = mongoose.Schema({
  title : String,
  message : String,
  creator : String,
  tags : [String],
  selectedFile : String,
  likeCount : {
    type : Number,
    default : 0
  },
  createdAt : {
    type : Date,
    default: new Date()
  }
})

// make a mongoose model from the schema
const PostModel = mongoose.model('PostMessage', PostSchema);

export default PostModel;