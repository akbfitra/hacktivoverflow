const Comment = require('../models/comment')
const Question = require('../models/question')

class CommentController{

  static create(req, res, next){
    const { description } = req.body
    const owner = req.user.id
    const upvotes = []
    const downvotes = []
    const id = req.params.id
    Comment.create({ description, owner, upvotes, downvotes })
      .then( data => {
        console.log(data._id)
        return Question.findByIdAndUpdate(id, {$push : { comments: data._id }})
      })
      .then(data => {
        console.log(data)
        res.status(200).json(data)
      })
      .catch(next)
  }

  static upVote(req, res, next){
    const owner = req.user.id
    const id = req.params.id
    Comment.findById(id)
      .then( data => {
        if (data){
          if (data.downvotes.includes(owner)){
            return Comment.findByIdAndUpdate(id, { $pull: { downvotes: owner }})
          } else {
            if(data.upvotes.includes(owner)){
              return Comment.findByIdAndUpdate(id, { $pull: { upvotes: owner }})
            } else {
              return Comment.findByIdAndUpdate(id, { $addToSet: { upvotes: owner }})
            }
          }
        }
      })
      .then( data => {
        if(!data.upvotes.length && data.downvotes.length){
          console.log('masuk')
          return Comment.findByIdAndUpdate(id, { $addToSet: { upvotes: owner }})
        } else {
          res.status(200).json(data)
        }
      })
      .then( data => {
        res.status(200).json(data)
      })
  }

  static downVote(req, res, next){
    const owner = req.user.id
    const id = req.params.id
    Comment.findById(id)
      .then( data => {
        if (data){
          if (data.upvotes.includes(owner)){
            return Comment.findByIdAndUpdate(id, { $pull: { upvotes: owner }})
          } else {
            if(data.downvotes.includes(owner)){
              return Comment.findByIdAndUpdate(id, { $pull: { downvotes: owner }})
            } else {
              return Comment.findByIdAndUpdate(id, { $addToSet: { downvotes: owner }})
            }
          }
        }
      })
      .then( data => {
        if(data.upvotes.length && !data.downvotes.length){
          console.log('masuk')
          return Comment.findByIdAndUpdate(id, { $addToSet: { downvotes: owner }})
        } else {
          res.status(200).json(data)
        }
      })
      .then( data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static delete(req, res, next){
    const id = req.params.id
    Comment.findByIdAndRemove(id)
      .then( data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static update(req, res, next){
    const fields = [ 'description']
    let update = {}
      for( let key in req.body ){
        fields.forEach( data => {
          if( key == data ){
            update[ key ] = req.body[ key ]
          } 
      }) 
    }

    Comment.findByIdAndUpdate(id, update)
      .then( result => {
        res.status(200).json(result)
      })
      .catch( next )
  }


  
}

module.exports = CommentController