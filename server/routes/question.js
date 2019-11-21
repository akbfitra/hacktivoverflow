const routes = require('express').Router();
const QuestionController = require('../controllers/question')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

routes.get('/', QuestionController.findAll)

routes.use(authentication)
routes.post('/', QuestionController.create)
routes.get('/user', QuestionController.findPostOwner)
routes.patch('/up/:id', QuestionController.upVote)
routes.patch('/down/:id', QuestionController.downVote)
routes.get('/search', QuestionController.search)
routes.get('/searchtag', QuestionController.searchTag)



routes.use('/:id', authorization)
routes.get('/:id', QuestionController.findOne)
routes.put('/:id', QuestionController.update)
routes.delete('/:id', QuestionController.delete )


module.exports = routes