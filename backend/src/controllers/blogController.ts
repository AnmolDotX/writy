import { createBlogInput, updateBlogInput } from "@anmoldotx/writy-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context } from "hono";


export const createBlog = async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const {success, data} = createBlogInput.safeParse(body);
    if (!success) {
        return c.json({
          status: 403,
          message: "Create Blog Input types are not correct",
        });
    }
    const {title, content} = data;

    const userId = await c.get('userId');

    if(!title && !content) {
        return c.json({
            status : 400,
            message : "Title, content and Author is required!"
        })
    }

    try {
        const newBlog = await prisma.post.create({
            data : {
                title, content, authorId : userId
            }
        })

        if(!newBlog) {
            return c.json({
                status : 500,
                message : "Error creating blog!"
            })
        }

        return c.json({
            status : 200,
            message : "Blog posted successfully!",
            data : newBlog
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
                message : "Unknow error occured while creating blog"
            })
        }
    }
}

export const updateBlog = async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const {success, data} = updateBlogInput.safeParse(body);
    if (!success) {
        return c.json({
          status: 403,
          message: "update blog input types are not correct",
        });
    }
    const {title, content , blogId} = data;

    if(!title || !content) {
        return c.json({
            status : 400,
            message : "Title or content is required!"
        })
    }

    if(!blogId) {
        return c.json({
            status : 400,
            message : "BlogId is required!"
        })
    }

    try {
        const updateBlog = await prisma.post.update({
            where : {
                id : blogId
            },
            data : {
                title, content
            }
        })

        if(!updateBlog) {
            return c.json({
                status : 500,
                message : "Error updating blog!"
            })
        }

        return c.json({
            status : 200,
            message : "Blog updated successfully!",
            data : updateBlog
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
                message : "Unknow error occured while updating blog"
            })
        }
    }
}

export const getBlog = async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const {id} = await c.req.param();
    const blogId = id;
    

    if(!blogId) {
        return c.json({
            status : 400,
            message : "BlogId is required!"
        })
    }

    try {
        const blog = await prisma.post.findUnique({
            where : {
                id : blogId
            }
        })

        if(!blog) {
            return c.json({
                status : 500,
                message : "Error finding blog!"
            })
        }

        return c.json({
            status : 200,
            message : "Blog found successfully!",
            data : blog
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
                message : "Unknow error occured while finding blog"
            })
        }
    }
}

// add pagination

export const getAllBlog = async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blogs = await prisma.post.findMany();

        if(!blogs) {
            return c.json({
                status : 500,
                message : "Error fetching blogs!"
            })
        }

        return c.json({
            status : 200,
            message : "Blog fetched successfully!",
            data : blogs
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
                message : "Unknow error occured while fetching blog"
            })
        }
    }
}