import { Hono } from 'hono'
import articleController from '../controllers/articles'
import middleware from '../middlewares/is-auth'

const articleApp = new Hono()

articleApp.get('/',  articleController.getArticles)

articleApp.get('/:id', articleController.getArticle)

articleApp.post('/', middleware.isAuth, articleController.postArticle)

articleApp.patch('/:id', middleware.isAuth, articleController.patchArticle)

articleApp.delete('/:id', middleware.isAuth, articleController.deleteArticle)

export default articleApp

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhcmkgcG9zdG1hbiIsInBhc3N3b3JkIjoiamFqYWphIn0.0B_S1Xd2IgU_yu3hJZ-TwLJmP5T7-xYdEWKDraGTC50