import React, { useContext, useState } from "react";
import {
  ProductImagesContainer,
  ChevronLeftButton,
  ChevronRightButton,
  ImageIndex,
  ResizeImagesContainer,
  RemoveImageButton,
  ResizeImagesAndRemoveButton,
  ToDetails,
} from "./product-images.styles";
import MyContext from "../../context";
import Image from 'next/image'

const DisplayProductImages = ({
  images,
  index,
  handleClickLeftButton,
  handleClickRightButton,
  handleRemoveImage,
  handleClickToProductDetails,
}) => {
  //context
  const my_context = useContext(MyContext);
  const { smBreakPoint } = my_context;

  const [imagesNumber, setImagesNumber] = useState(0);
  const changeImageLeft = () => {
    if (imagesNumber > 0) {
      setImagesNumber(imagesNumber - 1);
    }
  };
  const changeImageRight = () => {
    if (imagesNumber < images.length - 1) {
      setImagesNumber(imagesNumber + 1);
    }
  };

  return (
    <div>
      <ProductImagesContainer>
        {index !== undefined ? (
          <ChevronLeftButton
            onClick={handleClickLeftButton}
            getVisibility={index === 0}
            isExhibit={handleRemoveImage == undefined && images.length === 0}
          />
        ) : (
          <ChevronLeftButton
            onClick={changeImageLeft}
            getVisibility={imagesNumber === 0}
            isExhibit={
              handleRemoveImage == undefined &&
              images.length === 0 &&
              index !== undefined
            }
          />
        )}

        <ResizeImagesAndRemoveButton>
          {handleRemoveImage ? (
            <ResizeImagesContainer
              src={URL.createObjectURL(images[index])}
              width={smBreakPoint ? 250 : 160}
              height={smBreakPoint ? 200 : 130}
            />
          ) : images.length != 0 ? (
            handleClickToProductDetails != undefined ? (
              <ToDetails onClick={handleClickToProductDetails}>
                <Image
                  src={images[imagesNumber]}
                  width={160}
                  height={130}
                />
              </ToDetails>
            ) : (
              <Image
                src={images[imagesNumber]}
                width={smBreakPoint ? 250 : 160}
                height={smBreakPoint ? 200 : 130}
              />
            )
          ) : handleClickToProductDetails != undefined ? (
            <ToDetails onClick={handleClickToProductDetails}>
              <Image
                onClick={handleClickToProductDetails}
                src={"/images/products/noimage.png"}
                width={160}
                height={130}
              />
            </ToDetails>
          ) : (
            <Image
              src={"/images/products/noimage.png"}
              width={smBreakPoint ? 250 : 160}
              height={smBreakPoint ? 200 : 130}
            />
          )}

          {handleRemoveImage && (
            <RemoveImageButton onClick={handleRemoveImage}>
              Remove
            </RemoveImageButton>
          )}
        </ResizeImagesAndRemoveButton>
        {index !== undefined ? (
          <ChevronRightButton
            onClick={handleClickRightButton}
            getVisibility={index === images.length - 1}
            isExhibit={handleRemoveImage == undefined && images.length === 0}
          />
        ) : (
          <ChevronRightButton
            onClick={changeImageRight}
            getVisibility={imagesNumber === images.length - 1}
            isExhibit={
              handleRemoveImage == undefined &&
              images.length === 0 &&
              index !== undefined
            }
            style={{ visibility: images.length === 0 && "hidden" }}
          />
        )}
      </ProductImagesContainer>
      {handleRemoveImage && (
        <ImageIndex>{index + 1 + "/" + images.length}</ImageIndex>
      )}
    </div>
  );
};

export default DisplayProductImages;
