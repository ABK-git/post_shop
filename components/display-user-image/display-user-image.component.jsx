import React from "react";
import { UserImage } from "./display-user-image.styles";

const DisplayUserImage = ({ image_pass, ...otherProps }) =>
  image_pass ? (
    <UserImage
      src={image_pass}
      onerror={"/images/user/no_user.png"}
      {...otherProps}
    />
  ) : (
    <UserImage src={"/images/user/no_user.png"} {...otherProps} />
  );

export default DisplayUserImage;
