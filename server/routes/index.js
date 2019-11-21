const routes = require('express').Router();
const user = require('./user')
const question = require('./question')
const comment = require('./comment')

routes.use('/user', user)
routes.use('/question', question)
routes.use('/comment', comment)

module.exports = routes

