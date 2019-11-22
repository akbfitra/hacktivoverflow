const Question = require('../models/question')

class QuestionController{

  static create(req, res, next){
    const { title, description, tags } = req.body
    const owner = req.user.id 
    const upvotes = []
    const downvotes= []
    const comments = []
    Question.create({ title, description, tags, upvotes, downvotes, owner, comments })
      .then( result => {
        res.status(200).json(result)
      })
      .catch(next)
  }

  static findAll(req, res, next){
    Question.find()
      .populate('owner', 'username')
      .populate('comment')
      .then( data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static findPostOwner(req, res, next){
    const owner = req.user.id
    Question.find({ owner })
      .populate('owner')
      .populate('comment')
      .then( data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static upVote(req, res, next){
    const owner = req.user.id
    const id = req.params.id
    Question.findById(id)
      .then( data => {
        if (data){
          if (data.downvotes.includes(owner)){
            return Question.findByIdAndUpdate(id, { $pull: { downvotes: owner }})
          } else {
            if(data.upvotes.includes(owner)){
              return Question.findByIdAndUpdate(id, { $pull: { upvotes: owner }})
            } else {
              return Question.findByIdAndUpdate(id, { $addToSet: { upvotes: owner }})
            }
          }
        }
      })
      .then( data => {
        if(!data.upvotes.length && data.downvotes.length){
          console.log('masuk')
          return Question.findByIdAndUpdate(id, { $addToSet: { upvotes: owner }})
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
    Question.findById(id)
      .then( data => {
        if (data){
          if (data.upvotes.includes(owner)){
            return Question.findByIdAndUpdate(id, { $pull: { upvotes: owner }})
          } else {
            if(data.downvotes.includes(owner)){
              return Question.findByIdAndUpdate(id, { $pull: { downvotes: owner }})
            } else {
              return Question.findByIdAndUpdate(id, { $addToSet: { downvotes: owner }})
            }
          }
        }
      })
      .then( data => {
        if(data.upvotes.length && !data.downvotes.length){
          console.log('masuk')
          return Question.findByIdAndUpdate(id, { $addToSet: { downvotes: owner }})
        } else {
          res.status(200).json(data)
        }
      })
      .then( data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static findOne(req, res, next){
    const id = req.params.id
    Question.findById(id)
      .populate(['owner', 'comments'])
      .then( data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  // static findByTags(req, res, next){
  //   const { tags } = req.body
  //   Question.find({ tags })
  //     .then( data => {
  //       res.status(200).json(data)
  //     })
  //     .catch(next)
  // }

  static delete(req, res, next){
    const { id } = req.params
    Question.findByIdAndRemove(id)
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static update(req, res, next){
    const id = req.params.id
    const fields = [ 'title', 'description', 'tags' ]
    let update = {}
      for( let key in req.body ){
        fields.forEach( data => {
          if( key == data ){
            update[ key ] = req.body[ key ]
          } 
      }) 
    }

    Question.findByIdAndUpdate(id, update)
      .then( result => {
        res.status(200).json(result)
      })
      .catch( next )
  }

  static search(req, res, next){
    console.log(req.query.q)

    Question.find({
      title: new RegExp(`${req.query.q}`, 'gi'),
    })
      .then( data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static searchTag(req, res, next){
    const owner = req.user.id
    Article.find({
      tags: new RegExp(`${req.query.q}`, 'gi'), owner
    })
      .then( data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static getTags(req, res, next) {
    Question.find()
      .then(data => {
        let filter = data.filter(el => el.tags.includes(req.params.tag))
        res.status(200).json({ filter });
      })
      .catch( next );
  }

}

module.exports = QuestionController