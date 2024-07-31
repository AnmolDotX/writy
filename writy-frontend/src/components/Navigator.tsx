"use client"
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookie from 'js-cookie'

const Navigator = () => {
  const router = useRouter();

  const logoutHandler = () => {
    Cookie.remove("token");
    router.replace("/")
  }

  return (
    <div className='absolute top-2 right-3 w-96 rounded-md px-5 h-16 flex items-center justify-around shadow'>
      <Link
        href='/blogs/create-blog'
        className='cursor-pointer hover:shadow duration-300 transition-all py-2 px-5 bg-black hover:bg-slate-950/90 text-white rounded-full active:text-sky-400 active:shadow-lg'
      >
        Create
      </Link>
      <Link
        href='/blogs'
        className='cursor-pointer hover:shadow duration-300 transition-all py-2 px-5 bg-slate-100 text-black rounded-full active:text-sky-400 active:shadow-lg'
      >
        All Blogs
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className='hover:shadow transition-all duration-300 active:text-sky-400 active:shadow-lg'>
            <AvatarImage src='https://github.com/withastro/astro/blob/main/assets/astro.png?raw=true' />
            <AvatarFallback>AW</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='absolute -right-4 top-4'>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={()=>toast.warning("We are working on profile section!")}>Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={logoutHandler}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navigator;
