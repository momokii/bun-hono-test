import { Context, Next } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { verify } from 'hono/jwt'
import throw_err from '../utils/error-handling'

export default {
    isAuth: async (c: Context, next: Next) => {
        try {
            const headerToken = c.req.header('Authorization') || ''
            if (!headerToken) throw_err('Pastikan Gunakan header Authorization', 401)

            const jwt = headerToken.split(' ')[1]
            if(!jwt) throw_err('Gunakan Bearer Authorization', 401)
            
            // * verify token 
            const tokenData = await verify(jwt, process.env.SECRET_KEY || 'secret')
            if(!tokenData) throw_err('Token Invalid', 401)

            // * set token payload to context for further use
            c.set('tokenPayload', tokenData)
        } catch (e: any) {
            throw new HTTPException(
                e.statusCode, { message: e.message, cause: e }
            )
        }
        await next()
    }
}