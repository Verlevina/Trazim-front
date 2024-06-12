
export type User = {
    id: number;
    name: string;
    image: string;
    token:string;
    email:string;
    languageId: string;
    locationId: string;
    login: string;
    pictureUrl: string;
    surname: string;
    telegram: string;
    userRating: number;
}

export type Post = {
    id: number;
    title: string;
    description: string;
    owner: User | null;
    pictures: string[];
  };

  export type Posts = {
    posts: Post[];
    page: number;
    pageCount: number;
  }

  export type Filter = {
    id: number|null;
    title: string|null;
    originalLanguageId: number|null;
    pictureExisting: boolean|null;
    locationId: number|null;
    isArchived: boolean|null;
    userId: number|null;
    
    // Paging
    pageNumber: number;
    pageSize: number;
   
    // Ordering
    orderBy: string|null;
    orderDescending: boolean|null;
  }

  export type UserSinginRequest =  {
    email: string;
    password: string
  }
