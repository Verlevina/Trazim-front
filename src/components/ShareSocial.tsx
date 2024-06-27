import React from "react";
import { Link } from "react-router-dom";
//import { ShareSocial } from "react-share-social";
type LinkProps = {
  url: string;
};
export default function RSSUsage({ url }: LinkProps) {
  var path = `${window.location.protocol}//${window.location.host}/${url}`;
  return (
   // <ShareSocial
   <Link
      //url={path}
      to={path}
      //socialTypes={["facebook", "telegram", "WhatsApp"]}
    />
  );
}
