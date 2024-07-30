import { Context, Next } from "hono";
import { verify } from "hono/jwt";


export const jwtAuth = async (c : Context, next : Next) => {
    const token = c.req.header('Authorization') || "";
    
    try {
        const user = await verify(token, c.env.SIGNIN_SECRET);
        if(!user) {
            return c.json({
                status : 403,
                message : "You are not logged in!"
            })
        }
        c.set('userId', user.id)
        await next()
    } catch (error) {
        if(error instanceof Error) {
            return c.json({
                status : 500, 
                message : error.message
            })
        } else {
            return c.json({
                status : 500,
                message : "Unknow error while verifying JWT"
            })
        }
    }
}