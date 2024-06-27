import React, { useRef, useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  Avatar,
  Button,
  IconButton,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { ImageType, NewPost } from "../types";
import GetAppOutlinedIcon from "@mui/icons-material/GetAppOutlined";
import { CreateUserRequest } from "../server/types";

interface InputGroupProps {
  post: NewPost;
}

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

function ImagesUpload({ post }: InputGroupProps) {
  const [selectedImages, setSelectedImages] = useState<Array<ImageType>>(
    post.pictures
  );
  const [message, setMessage] = useState<Array<string>>([]);

  const selectImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    let files = event.target.files;
    let newSelectedImages: Array<ImageType> = [];

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        newSelectedImages.push({
          file: file,
          fileName: file.name,
          image: URL.createObjectURL(file),
          row: 1,
          column: 1,
        });
      }
      const pictures = [...newSelectedImages, ...selectedImages];
      setSelectedImages(pictures);
      post.pictures = pictures;
      setMessage([]);
    }
  };

  return (
    <div>
      <div className="row my-3">
        <div className="col-8">
          <label className="btn btn-default p-0">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={selectImages}
            />
          </label>
        </div>
      </div>
      {selectedImages && (
        <ImageList
          sx={{ height: 70, overflow: "auto" }}
          variant="quilted"
          cols={4}
          rowHeight={121}
        >
          {selectedImages.map((image, i) => (
            <ImageListItem key={i} cols={image.column} rows={image.row}>
              {
                <img
                  {...srcset(image.image, 121, image.row, image.column)}
                  src={image.image}
                  alt={image.fileName}
                  loading="lazy"
                />
              }
            </ImageListItem>
          ))}
        </ImageList>
      )}

      {message.length > 0 && (
        <div className="alert alert-secondary mt-2" role="alert">
          <ul>
            {message.map((item, i) => {
              return <li key={i}>{item}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ImagesUpload;

interface InputImageGroupProps {
  user: CreateUserRequest;
  name: string | null;
}

export function ImageUpload({ user, name }: InputImageGroupProps) {
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(user.picture);
  const [message, setMessage] = useState<Array<string>>([]);
  const uploadRef = useRef<HTMLInputElement>(null);
  const onUploadButtonClick = () => {
    uploadRef.current?.click();
  };
  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files !== null ? event.target.files[0] : null;
    if (file !== null) {
      const newSelectedImage = {
        file: file,
        fileName: file.name,
        image: URL.createObjectURL(file),
        row: 1,
        column: 1,
      };
      setSelectedImage(newSelectedImage);
      user.picture = newSelectedImage;
      //setMessage([]);
    }
  };
  const onClearImageClick = () => {
    setSelectedImage(null);
    user.picture = null;
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Avatar
        sx={{ width: 100, height: 100, margin: "8px" }}
        src={selectedImage?.image}
      >
        {name !== null ? name : null}
      </Avatar>
      <input
        type="file"
        name="image"
        ref={uploadRef}
        onChange={selectImage}
        style={{
          visibility: "hidden",
          padding: 0,
          height: "1px",
          position: "fixed",
        }}
      />
      <div style={{ display: "flex", alignSelf: "stretch" }}>
        <Button
          variant="outlined"
          startIcon={<GetAppOutlinedIcon />}
          onClick={onUploadButtonClick}
          fullWidth
          style={{ flexGrow: 2 }}
        >
          Upload
        </Button>
        <IconButton
          aria-label="fingerprint"
          color="primary"
          onClick={onClearImageClick}
        >
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </div>
      {message.length > 0 && (
        <div className="alert alert-secondary mt-2" role="alert">
          <ul>
            {message.map((item, i) => {
              return <li key={i}>{item}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
