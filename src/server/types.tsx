import React from "react";

export type User = {
    id: number;
    name: string;
    isHonest: boolean;
    image: string;
}

export type Post = {
    id: number;
    title: string;
    description: string;
    owner: User;
    pictures: string[];
  };

  export type Posts = {
    posts: Post[];
    page: number;
    pageCount: number;
  }

  export type Filter = {
    page: number;
    pageCount: number;
    isStart: Boolean
  }
