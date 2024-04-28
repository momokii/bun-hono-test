import { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { LoginBody } from '../interfaces/auth.interfaces'
import { sign } from 'hono/jwt'

export default {
    login: async (c: Context) => {
        try {
            const body: LoginBody = await c.req.json()
            const acc = {
                email: body.email,
                password: body.password
            }

            const error = false 
            if(error) {
                throw new Error('Error Login')
            }

            const secret: string = process.env.SECRET_KEY || ''
            const token = await sign(
                acc,
                secret
            )

            return c.json({
                errors: false, 
                message: 'test',
                data: {
                    id: 1,
                    email: acc.email,
                    token: token,
                    token_type: 'Bearer'
                }   
            }, 200)
        } catch (e) {
            throw new HTTPException(400, { 
                message: 'error', 
                cause: e 
            })
        }
        
    }

}
