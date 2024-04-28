import { Hono } from 'hono'
import { validator } from 'hono/validator'
import { HTTPException } from 'hono/http-exception'
import { LoginBody } from '../interfaces/auth.interfaces'
import authController from '../controllers/auth'

const authApp = new Hono()

authApp.post(
    '/login', 
    validator('json', (value: LoginBody, c) => {
        if(!value.email || !value.password) {
            throw new HTTPException(400, {
                message: "Harus input email dan password"
            })
        }

        if(typeof value.email  !== 'string' || typeof value.password !== 'string') {
            throw new HTTPException(400, {
                message: "Email dan password harus string"
            })
        }
    }),
    authController.login)

export default authApp