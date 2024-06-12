
export interface IFile {
    url: string,
    name: string,
  }

  export type ImageType = {
    fileName: string;
    file: File;
    image: string;
    row: number;
    column: number;
  }

  export type NewPost = {
    title: string;
    description: string;
    pictures: ImageType[];
  };