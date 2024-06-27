import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RSSUsage from "../components/ShareSocial";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Post } from "../server/types";
import { globalUrl } from "../server/userAPI";
import { Link } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { getShortName } from "../utils/utils";

interface Props {
  post: Post;
}
export default function CardPostItem({ post }: Props) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
            src={
              post.user?.pictureUrl?.length > 0
                ? `${globalUrl}\\${post.user?.pictureUrl}`
                : ""
            }
          >
            {getShortName(
              post?.user?.name,
              post?.user?.surname,
              post?.user?.login
            )}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.title}
        subheader={new Date(post.created).toLocaleDateString()}
      />
      <CardMedia
        component="img"
        src={
          post?.pictureUrls?.length > 0
            ? `${globalUrl}\\${post?.pictureUrls[0]}`
            : ""
        }
        height="194"
        alt={post.title}
      />
      <CardContent>
        <div dangerouslySetInnerHTML={{ __html: post.description }}></div>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <RSSUsage url={`post/${post.id}`} />
        <Link to={`/post/${post.id}`}>
          <IconButton aria-label="detail">
            <MoreHorizIcon />
          </IconButton>
        </Link>
      </CardActions>
    </Card>
  );
}
