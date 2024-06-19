import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { InputProps, styled, Input as BaseInput, TextField } from "@mui/material";
import { NewPost } from "../types";
interface InputGroupProps {
  post: NewPost;
}

export default function TextareaForCreatePost({ post }: InputGroupProps) {
  const [description, setDescription] = useState<string>(post.description);
  const myColors = [
    "#EF9A9A",
    "#F48FB1",
    "#CE93D8",
    "#9FA8DA9",
    "#81D4FA",
    "#80DEEA",
    "#80CBC4",
    "#A5D6A7",
    "#C5E1A5",
    "#E6EE9C",
    "#FFF59D",
    "#FFE082",
    "#FFCC80",
    "#FFAB91",
    "#BCAAA4",
    "#EEEEEE",
    "#B0BEC5",
    "#263238",
  ];
  const myTextColors = [
    "#B71C1C",
    "#880E4F",
    "#4A148C",
    "#311B92",
    "#1A237E",
    "#01579B",
    "#006064",

    "#004D40",
    "#33691E",
    "#827717",
    "#F57F17",
    "#FF6F00",
    "#E65100",
    "#BF360C",
    "#212121",
    "#263238",
    "black",
    "white",
  ];
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      [{ color: myTextColors }],
      [{ background: myColors }],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "color",
    "link",
    "background",
    "align",
  ];

  const handleProcedureContentChange = (content: any) => {
    setDescription(content);
    post.description = content;
  };
  return (
    <>
      <ReactQuill
        style={{ width: "100%", height: "100%", margin: "20px 0 50px" }}
        theme="snow"
        modules={modules}
        formats={formats}
        value={description}
        placeholder="Input description"
        onChange={handleProcedureContentChange}
      />
    </>
  );
}

export function UnstyledInputBasic({ post }: InputGroupProps) {
  const [title, setTitle] = useState(post.title);
  return (
    <TextField
      style={{ margin: "20px 0" }}
      aria-label="title"
      placeholder={"Input title"}
      value={title}
      onChange={(event) => {
        const title = event.target.value;
        setTitle(title);
        post.title = title;
      }}
    />
  );
}
