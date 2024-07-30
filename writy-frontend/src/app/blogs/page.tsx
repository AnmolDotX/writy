"use client"
import ArticleCard from "@/components/ArticleCard";
import { BACKEND_URL } from "@/config/config";
import { FetchBlogsResponse } from "@/interfaces/fetchBlogInterface";
import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";

const AllBlogs = () => {

    const fetchBlogs = async () => {
        const {data} : AxiosResponse<FetchBlogsResponse> = await axios.get(`${BACKEND_URL}/api/v1/blog/all/bulk`)
        console.log(data);
        
    }

    useEffect(()=>{
        fetchBlogs()
    },[])

    return (
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 max-h-screen overflow-hidden">
            <div className="space-y-4">
                <div className="w-full text-center">
                <h1 className="text-3xl font-bold">Web Development Insights</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto mt-1">
                    Explore the latest trends, technologies, and best practices shaping the future of web development.
                </p>
                </div>
                <div id="articleCardContainer" className="overflow-y-scroll h-[80vh] scrollbar-hide">
                {
                    Array.from({length : 10}).map((_, index)=>(
                        <ArticleCard
                            key={index}
                            author="anmol"
                            content="hello my name is anmol and I am god, now let me see what you wanna talk about yourself"
                            title="I am God"
                            publishedDate="30 June, 2024"
                        />
                    ))
                }
                </div>
            </div>
        </div>
    );
}

export default AllBlogs;