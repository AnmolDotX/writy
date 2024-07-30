import { Hono} from "hono";
import { createBlog, getAllBlog, getBlog, updateBlog } from "../controllers/blogController";
import { jwtAuth } from "../middlewares/JWTauth";

const blogRouter = new Hono();

blogRouter.use("/*", jwtAuth)

blogRouter
    .post('/', createBlog)
    .put('/', updateBlog)
    .get('/:id', getBlog)
    .get('/all/bulk', getAllBlog)

export {blogRouter};