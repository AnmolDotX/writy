import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signupInput, SignupInputType } from "@anmoldotx/writy-common";

export const signupController = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body: SignupInputType = await c.req.json();
  const { success, data } = signupInput.safeParse(body);

  if (!success) {
    return c.json({
      status: 403,
      message: "Signup Input types are not correct",
    });
  }

  const { email, password, username } = data;

  if (!username) {
    return c.json({
      status: 400,
      message: "Username is compulsory!",
    });
  }

  if (!email) {
    return c.json({
      status: 400,
      message: "Email is required!",
    });
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return c.json({
      status: 400,
      message: "User with given email already exists!",
    });
  }

  if (!password) {
    return c.json({
      status: 400,
      message: "You haven't provided the password!",
    });
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        name: username,
        email,
        password,
      },
      select: {
        id: true,
        name: true,
        email: true,
        posts: true,
      },
    });

    if (!newUser) {
      return c.json({
        status: 500,
        message: "Error creating new user! Try later!",
      });
    }

    const userToken = await sign({ user: newUser.id }, c.env.SIGNUP_SECRET);

    return c.json({
      status: 200,
      message: "User created successfully!",
      user: newUser,
      token: userToken,
    });
  } catch (error) {
    if (error instanceof Error) {
      return c.json({
        status: 500,
        message: error.message,
      });
    }
    return c.json({
      status: 500,
      message: "Unknown error while sign up",
    });
  }
};
