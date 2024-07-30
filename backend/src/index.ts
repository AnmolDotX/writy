import { Hono } from 'hono'
import { blogRouter, userRouter } from './routers'

const app = new Hono<{
  Bindings : {
    DATABASE_URL : string,
    SIGNUP_SECRET : string,
  }
}>()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);

export default app
