import React, { useContext } from "react";
import {
  Flex,
  ChevronLeftButton,
  ChevronRightButton,
  RemoveImageButton,
  ResizeImagesAndRemoveButton,
  ImageIndex,
} from "./prepare-product-images.styles";
import Image from "react-image-resizer";
import MyContext from "../../context";

const PrepareProductImages = ({
  images,
  index,
  handleClickLeftButton,
  handleClickRightButton,
  handleRemoveImage,
}) => {
  //context
  const my_context = useContext(MyContext);
  const { smBreakPoint } = my_context;

  return (
    <div>
      <Flex>
        <ChevronLeftButton
          onClick={handleClickLeftButton}
          getVisibility={index > 0}
        />
        <ResizeImagesAndRemoveButton>
          <Image
            src={URL.createObjectURL(images[index])}
            width={smBreakPoint ? 250 : 160}
            height={smBreakPoint ? 200 : 130}
          />
          <RemoveImageButton onClick={handleRemoveImage}>
            Remove
          </RemoveImageButton>
        </ResizeImagesAndRemoveButton>
        <ChevronRightButton
          onClick={handleClickRightButton}
          getVisibility={index < images.length - 1}
        />
      </Flex>
      <ImageIndex>{index + 1 + "/" + images.length}</ImageIndex>
    </div>
  );
};

export default PrepareProductImages;
