"use client";
import ArticleCard from "@/components/ArticleCard";
import { BACKEND_URL } from "@/config/config";
import {
  Blog,
  FetchBlogsResponseInterface,
} from "@/interfaces/fetchBlogInterface";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Cookie from 'js-cookie';

const AllBlogs = () => {
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const { data }: AxiosResponse<FetchBlogsResponseInterface> =
        await axios.get(`${BACKEND_URL}/api/v1/blog/all/bulk`, {
          headers: {
            Authorization: Cookie.get("token"),
          },
        });
      if (data) {
        setAllBlogs(data.data);
      }
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Unknow error while fetching blogs");
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className='container mx-auto py-8 px-4 sm:px-6 lg:px-8 max-h-screen overflow-hidden'>
      <div className='space-y-4'>
        <div className='w-full text-center'>
          <h1 className='text-3xl font-bold'>Existantial Insights</h1>
          <p className='text-muted-foreground max-w-2xl mx-auto mt-1'>
            Explore the latest trends, technologies, and best practices shaping
            the future of web development.
          </p>
        </div>
        {isLoading ? (
          <div className='w-full h-[60vh] flex items-center justify-center text-3xl font-bold tracking-widest animate-pulse'>
            ...loading
          </div>
        ) : (
          <div
            id='articleCardContainer'
            className='overflow-y-scroll h-[80vh] scrollbar-hide'
          >
            {allBlogs?.map((blog) => (
              <ArticleCard
                key={blog.id}
                id={blog.id}
                author={blog.author.name || "Anonymous"}
                content={blog.content}
                title={blog.title}
                publishedDate={new Date(blog?.publishedAt).toLocaleString('en-GB')}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBlogs;
