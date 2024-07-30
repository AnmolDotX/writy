import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context } from "hono";
import { sign } from "hono/jwt";
import {signinInput} from '@anmoldotx/writy-common'

export const signInController = async (c : Context) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const {success, data} = signinInput.safeParse(body);
    if (!success) {
        return c.json({
          status: 403,
          message: "Signin Input types are not correct",
        });
    }
    const {email, password} = data;

    try {
        const user = await prisma.user.findUnique({
            where : {email}
        })

        if(!user) {
            return c.json({
                status : 401,
                message : "User does not exist!"
            })
        }

        if(user?.password !== password) {
            
            return c.json({
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