import { Hono} from "hono";
import { createBlog, getAllBlog, getBlog, updateBlog } from "../controllers/blogController";
import { jwtAuth } from "../middlewares/JWTauth";

const blogRouter = new Hono();

blogRouter.get('/all/bulk', getAllBlog)
blogRouter.use("/*", jwtAuth)
blogRouter
    .post('/', createBlog)
    .put('/', updateBlog)
    .get('/:id', getBlog)
    

export {blogRouter};