"use client"
import { BACKEND_URL } from "@/config/config";
import { CreateBlogPostResponse } from "@/interfaces/createBlogResponseInterface";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function CreateBlog() {

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();
    const createBlogSubmitHandler = async (e : FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true)
            const {data} : AxiosResponse<CreateBlogPostResponse> = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                title,
                content : description
            }, {
                headers : {
                    Authorization : localStorage.getItem("token")
                }
            })
            toast.success("Blog created successfully!")
            setIsLoading(false);
            router.push(`/blogs/${data.data.id}`)
        } catch (error) {
            if(error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error("unknown error while creating blog")
            }
            setIsLoading(false)
        }
    }

    return (
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Write with Writy</h1>
          </div>
          <article className="bg-card rounded-lg shadow-lg min-h-[70vh] p-6 lg:p-12">
            <form onSubmit={createBlogSubmitHandler} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-lg font-bold text-muted-foreground">
                  Title of the blog
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}
                  className="block w-full rounded-md border-muted bg-background p-2 text-sm text-foreground focus:border-primary focus:ring-primary"
                  placeholder="Enter a title for your blog post"
                />
              </div>
              <div>
                <label htmlFor="content" className="block text-lg font-bold text-muted-foreground">
                  Content of the blog
                </label>
                <textarea
                  id="content"
                  rows={20}
                  value={description}
                  onChange={(e)=>setDescription(e.target.value)}
                  className="block w-full rounded-md border-muted bg-background p-2 text-sm text-foreground focus:border-primary focus:ring-primary"
                  placeholder="Write the content of your blog post"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-1"
                >
                  {isLoading ? "Loading..." : "Publish"}
                </button>
              </div>
            </form>
          </article>
        </div>
      </div>
    )
  }