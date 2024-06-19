import React, { useState } from "react";
import { ImageList, ImageListItem } from "@mui/material";
import { ImageType, NewPost } from "../types";
import { Post } from "../server/types";

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
          sx={{ height: 370, overflow: "auto" }}
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
