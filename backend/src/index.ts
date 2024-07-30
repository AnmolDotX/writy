import { Hono } from 'hono'
import { signupController } from './controllers'

const app = new Hono<{
  Bindings : {
    DATABASE_URL : string,
    SIGNUP_SECRET : string,
  }
}>()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/user/signup', signupController)

app.post('/api/v1/user/signin', (c)=>{
  return c.text('user signin');
})

app.post('/api/v1/blog', (c)=>{
  return c.text("blog page")
})

app.put('/api/v1/blog', (c)=>{
  return c.text('put blog')
})

app.get('/api/v1/blog/:id', (c)=>{
  const {id} = c.req.param();
  return c.text(`${id}, aur bhai kya hal hai?`)
})

app.get('/api/v1/blog/bulk', (c)=>{
  return c.text('here all the blogs');
})

export default app
