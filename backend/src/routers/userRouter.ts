import { Hono } from "hono";
import { signInController, signupController } from "../controllers";

const userRouter = new Hono();

userRouter
    .post("/signup", signupController)
    .post("/signin", signInController);

export { userRouter };
