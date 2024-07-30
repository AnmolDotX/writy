interface Blog {
    id: string;
    title: string;
    content: string;
    published: boolean;
    authorId: string;
  }
  
export interface FetchBlogsResponse {
    status: number;
    message: string;
    data: Blog[];
  }
  