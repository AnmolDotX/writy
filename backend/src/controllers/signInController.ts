import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context } from "hono";
import { sign } from "hono/jwt";


export const signInController = async (c : Context) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const {email, password} = await c.req.json();
    console.log(email, password);
    

    if(!email || !password) {
        c.json({
            status : 400,
            message : "email and password are required!"
        })
    }

    try {
        const user = await prisma.user.findUnique({
            where : {email}
        })

        if(!user) {
            c.json({
                status : 401,
                message : "User does not exist!"
            })
        }
    
        if(user?.password !== password) {
            c.json({
                status : 403,
                message : "Invalid Password!"
            })
        }
    
        const jwt = await sign({id : user?.id}, c.env.SIGNIN_SECRET);
        return c.json({
            status : 200,
            message : "User logged in successfully!",
            token : jwt
        })
    } catch (error) {
        if(error instanceof Error) {
            return c.json({
                status : 500,
                message : error.message
            })
        } else {
            return c.json({
                status : 500,
                message : "Unknow error while sign-in"
            })
        }
    }
}