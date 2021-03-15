import React from "react";
import { UserImage } from "./display-user-image.styles";

const DisplayUserImage = ({ image_pass }) =>
  image_pass ? (
    <UserImage src={image_pass} onError={"/images/user/no_user.png"} />
  ) : (
    <UserImage src={"/images/user/no_user.png"} />
  );

export default DisplayUserImage;
