interface Author {
  name: string;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author: Author;
  publishedAt : string
}

export interface FetchBlogsResponseInterface {
  status: number;
  message: string;
  data: Blog[];
}
