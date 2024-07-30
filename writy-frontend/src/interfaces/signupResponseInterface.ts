interface User {
    id: string;
    name: string;
    email: string;
    posts: any[];
  }
  
export interface signupResponseInterface {
    status: number;
    message: string;
    user: User;
    token: string;
}
  