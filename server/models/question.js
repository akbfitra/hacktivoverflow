const mongoose = require('mongoose')
const { hashPassword } = require('../helpers/bcryptjs')
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema

const questionSchema = new Schema({
  title : {
    type: String,
    required: [true, 'Title Must Be Filled']
  },
  description : {
    type: String,
    required: [true, 'Description Must Be Filled']
  },
  tags: [{
    type: String
  }],
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
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref:'Comment'
    }
  ]
}, {timestamps : true , versionKey: false})

const Question = mongoose.model('Question', questionSchema)
module.exports = Question