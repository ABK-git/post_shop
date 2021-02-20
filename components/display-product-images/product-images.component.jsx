import React, { useContext } from "react";
import {
  ProductImagesContainer,
  ChevronLeftButton,
  ChevronRightButton,
  ImageIndex,
  ResizeImagesContainer,
  RemoveImageButton,
  ResizeImagesAndRemoveButton,
} from "./product-images.styles";
import MyContext from "../../context";

const DisplayProductImages = ({
  images,
  index,
  handleClickLeftButton,
  handleClickRightButton,
  handleRemoveImage,
}) => {
  //context
  const my_context = useContext(MyContext);
  const { smBreakPoint } = my_context;

  //画像の番号
  const getImageIndex = index + 1 + "/" + images.length;

  return (
    <div>
      <ProductImagesContainer>
        <ChevronLeftButton
          onClick={handleClickLeftButton}
          getVisibility={index === 0}
        />
        <ResizeImagesAndRemoveButton>
          <ResizeImagesContainer
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
          getVisibility={index === images.length - 1}
        />
      </ProductImagesContainer>
      <ImageIndex>{getImageIndex}</ImageIndex>
    </div>
  );
};

export default DisplayProductImages;
