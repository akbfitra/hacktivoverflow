const routes = require('express').Router();
const CommentController = require('../controllers/comment')
const authentication = require('../middlewares/authentication')

routes.use(authentication)
routes.post('/:id', CommentController.create)
routes.patch('/:id/up', CommentController.upVote)
routes.patch('/:id/down', CommentController.downVote)
routes.put('/:id', CommentController.update)
routes.delete('/:id', CommentController.delete)

module.exports = routes