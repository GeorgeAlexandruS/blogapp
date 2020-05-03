const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    unique: true
  },
  body: {
    type: String,
    required: [true, 'Body is required'],
    unique: true
  },
  subtitle: {
    type: String,
    required: [true, 'Subtitle is required']
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  datePosted: {
    type: Date,
    default: new Date()
  },
  image: String
});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost
