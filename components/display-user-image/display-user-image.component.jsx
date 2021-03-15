import React, { useContext } from "react";
import MyContext from "../../context";
import { UserImage } from "./display-user-image.styles";

const DisplayUserImage = ({ image_pass }) => {
  //context
  const my_context = useContext(MyContext);
  const { smBreakPoint } = my_context;

  return image_pass ? (
    <UserImage
      width={smBreakPoint ? 90 : 60}
      height={70}
      src={image_pass}
      noImageSrc={"/images/user/no_user.png"}
    />
  ) : (
    <UserImage
      width={smBreakPoint ? 90 : 60}
      height={70}
      src={"/images/user/no_user.png"}
    />
  );
};

export default DisplayUserImage;
