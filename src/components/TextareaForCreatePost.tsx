import React from "react";
import ReactQuill from "react-quill";
import { Post } from "../server/types";
import "react-quill/dist/quill.snow.css";
import { InputProps, styled, Input as BaseInput } from "@mui/material";

type TextareaType = {
  post: Post;
  setPost: React.Dispatch<React.SetStateAction<Post>>;
};
export default function TextareaForCreatePost({ post, setPost }: TextareaType) {
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
    setPost({ ...post, description: content });
  };
  return (
    <>
      <ReactQuill
        style={{ width: "100%", height: "100%" }}
        theme="snow"
        modules={modules}
        formats={formats}
        value={post.description}
        onChange={handleProcedureContentChange}
      />
    </>
  );
}

const Input = React.forwardRef(function CustomInput(
  props: InputProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return <BaseInput slots={{ input: InputElement }} {...props} ref={ref} />;
});

export function UnstyledInputBasic({ post, setPost }: TextareaType) {
  return (
    <Input
      aria-label="Demo input"
      placeholder="Type something…"
      value={post.title}
      onChange={(event) => {
        setPost({ ...post, title: event.target.value });
      }}
    />
  );
}

const blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const InputElement = styled("input")(
  ({ theme }) => `
  width: 320px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${
    theme.palette.mode === "dark" ? grey[900] : grey[50]
  };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[600] : blue[200]
    };
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);
