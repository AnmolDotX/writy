import Navigator from "@/components/Navigator";
import React from "react";

const BlogLayout = ({children} : {children : React.ReactNode}) => {
    return (
        <div>
            <Navigator/>
            {children}
        </div>
    );
}

export default BlogLayout;