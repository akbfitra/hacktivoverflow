const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
  description : {
    type: String,
    required: [true, 'Description Must Be Filled']
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  upvotes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  downvotes: [
    {
      type: Schema.Types.ObjectId,
      ref:'User'
    }
  ],
}, { timestamps: true, versionKey: false})

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment