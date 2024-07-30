import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context } from "hono";


export const signInController = async (c : Context) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const {email, password} = await c.req.json();

    if(!email || !password) {
        c.json({
            status : 400,
            message : "email and password are required!"
        })
    }

    const user = await prisma.user.findUnique({
        where : email
    })

    if(user?.password !== password) {
        c.json({
            status : 400,
            message : "Invalid Password!"
        })
    }

    const jwt = await 

}