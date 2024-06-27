import React from "react";
import { ShareSocial } from "react-share-social";
type LinkProps = {
  url: string;
};
export default function RSSUsage({ url }: LinkProps) {
  var path = `${window.location.protocol}//${window.location.host}/${url}`;
  return (
    <ShareSocial
      url={path}
      socialTypes={["facebook", "telegram", "WhatsApp"]}
    />
  );
}
