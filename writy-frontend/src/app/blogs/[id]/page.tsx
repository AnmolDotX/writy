"use client"

import ClockIcon from "@/components/icons/ClockIcon"
import ShareIcon from "@/components/icons/ShareIcon"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { BACKEND_URL } from "@/config/config";
import { BlogResponseInterface, DetailedBlogInterface } from "@/interfaces/blogResponseInterface";
import axios, { AxiosResponse } from "axios";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ArticlePage() {
    const [blog, setBlog] = useState<DetailedBlogInterface>({
        author : {
            name : ""
        },
        authorId : "",
        id : "",
        content : "",
        title : ""
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {id} = useParams();

    useEffect(()=>{
        (async() => {
            try {
                setIsLoading(true)
                const {data} : AxiosResponse<BlogResponseInterface> = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
                    headers : {
                        Authorization : localStorage.getItem('token')
                    }
                });
                setBlog(data.data)
                setIsLoading(false)
            } catch (error) {
                if(error instanceof Error) {
                    toast.error(error.message)
                } else {
                    toast.error("Unknow error while fetching Blog")
                }
                setIsLoading(false)
            }
        })()
    },[])

  return isLoading ? (
    <div className="h-screen w-screen flex items-center justify-center text-xl font-bold tracking-widest">
        ...loading blog
    </div>
  ) : (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="space-y-8 overflow-hidden ">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">{blog?.title}</h1>
          <div className="flex items-center justify-center text-muted-foreground text-sm">
            <span>June 1, 2024</span>
            <span className="mx-2">·</span>
            <span>{`${Math.ceil(blog?.content.length/100)} minutes`}</span>
          </div>
        </div>
        <article className="bg-card rounded-lg border shadow-lg p-6 lg:p-12">
          <div className="flex items-center justify-between mb-4 lg:mb-8">
            <div className="flex items-center text-muted-foreground text-sm">
              <Avatar className="w-8 h-8 mr-2">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>{blog.author.name.slice(0,1).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span>By {blog.author.name}</span>
            </div>
          </div>
          <div id="blogContent" className="border-t border-muted pt-4 lg:pt-8">
            <div className="w-full min-h-96">
                {
                    blog.content
                }
            </div>
            <div className="flex items-center justify-between my-6 lg:my-8">
              <div className="flex items-center text-muted-foreground text-sm cursor-pointer hover:text-sky-600 transition-all duration-300">
                <ShareIcon className="w-4 h-4 mr-2" />
                <span>Share this article</span>
              </div>
              <div className="flex items-center text-muted-foreground text-sm">
                <ClockIcon className="w-4 h-4 mr-2" />
                <span>{Math.ceil(blog?.content.length/100)} min read</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}


