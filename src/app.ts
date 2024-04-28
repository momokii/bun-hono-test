import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { secureHeaders } from 'hono/secure-headers'
import { prettyJSON } from 'hono/pretty-json'

// * import controllers routes
import articleApp from './routes/article.routes'
import authApp from './routes/auth.routes'

const app = new Hono().basePath('/api')

// * MIDDLEWARE 
app.use(cors())
app.use(secureHeaders())
app.use(logger())
app.use(prettyJSON())

// * ROUTING
app.route('/articles', articleApp)
app.route('/auth', authApp)

app.get('/', (c) => {
  c.status(200)
  return c.json({
    errors: false,
    message: "hello world"
  })
})

// * GLOBAL ERROR HANDLING 
app.notFound((c) => {
  c.status(404)
  return c.json({
    errors: true,
    message: "Endpoint not found"
  })
}) 

app.onError((err, c) => {
  console.error(`${err}`)
  c.status = c.status || 500
  err.message = err.message || 'Internal Server Error'
  return c.json({
    errors: true,
    message: err.message
  })
})

// * START SERVER
export default {
  port: process.env.PORT || 3000,
  fetch: app.fetch
}
