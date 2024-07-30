import z from 'zod';
export declare const signupInput: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    email: string;
    password: string;
}, {
    username: string;
    email: string;
    password: string;
}>;
export declare const signinInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const createBlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export declare const updateBlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    blogId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    blogId: string;
}, {
    title: string;
    content: string;
    blogId: string;
}>;
export type SignupInputType = z.infer<typeof signupInput>;
export type SigninInputType = z.infer<typeof signinInput>;
export type CreateBlogInputType = z.infer<typeof createBlogInput>;
export type UpdateBlogInputType = z.infer<typeof updateBlogInput>;
