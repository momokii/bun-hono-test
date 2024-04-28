import { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { Article } from '../interfaces/article.interfaces'

export default {
    getArticles: async (c: Context) => {
        try {            
            return c.json({
                errors: false,
                message: "articles",
                data: [
                    {
                        id: 1,
                        title: "Article 1",
                        content: "This is article 1"
                    },
                    {
                        id: 2,
                        title: "Article 2",
                        content: "This is article 2"
                    }
                ]
            }, 200)
        } catch (e: any) {
            throw new HTTPException(
                e.statusCode, { message: e.message, cause: e }
            )
        }
        
    },

    getArticle: async (c: Context) => {
        try {
            const id = c.req.param('id')
            return c.json({
                errors: false,
                message: "article",
                data: {
                    id: id,
                    title: `Article ${id}`,
                    content: `This is article ${id}`
                }
            }, 200)
        } catch (e: any) {
            throw new HTTPException (
                e.statusCode, { message: e.message, cause: e }
            )
        }
        
    },

    postArticle: async (c: Context) => {
        try {
            const tokenData = await c.get('tokenPayload')
            const articleData: Article = await c.req.json()
            c.status(201)
            return c.json({
                errors: false,
                message: "article created",
                data: {
                    email: tokenData.email,
                    id: articleData.id,
                    title: articleData.title,
                    content: articleData.content
                }
            })
        } catch (e: any) {
            
        }
    },

    patchArticle: async (c: Context) => {
        try {
            const tokenData = await c.get('tokenPayload')
            const id = c.req.param('id')
            const newData: Article = await c.req.json()
            return c.json({
                errors: false,
                message: "article updated",
                data: {
                    email: tokenData.email,
                    id,
                    title: newData.title,
                    content: newData.content
                }
            }, 200)
        } catch(e: any) {
            throw new HTTPException (
                e.statusCode, { message: e.message, cause: e }
            )
        }
    },

    deleteArticle: async (c: Context) => {
        try {
            const tokenData = await c.get('tokenPayload')
            const id = c.req.param('id')
            return c.json({
                errors: false,
                message: "article deleted",
                data: {
                    email: tokenData.email,
                    id
                }
            }, 200)
        } catch (e: any) {
            throw new HTTPException (
                e.statusCode, { message: e.message, cause: e }
            )
        }
    }
}