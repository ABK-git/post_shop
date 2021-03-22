import React, { useState, useContext } from "react";
import MyContext from "../../context";
import {
  Flex,
  ChevronLeftButton,
  ChevronRightButton,
  ToDetails,
} from "./product-images.styles";
import Image from "next/image";
import router from "next/router";

const ProductImages = ({
  images,
  product,
  cartSize,
  handleClickTo,
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
    <Flex>
      <ChevronLeftButton
        onClick={changeImageLeft}
        getVisibility={imagesNumber > 0}
      />
      {cartSize || handleClickTo ? (
        <ToDetails onClick={handleClickTo}>
          <Image
            src={
              (images && images[imagesNumber]) || "/images/products/noimage.png"
            }
            width={160}
            height={130}
          />
        </ToDetails>
      ) : (
        <Image
          src={
            (images && images[imagesNumber]) || "/images/products/noimage.png"
          }
          width={smBreakPoint ? 250 : 160}
          height={smBreakPoint ? 200 : 130}
        />
      )}

      <ChevronRightButton
        onClick={changeImageRight}
        getVisibility={images && imagesNumber < images.length - 1}
      />
    </Flex>
  );
};

export default ProductImages;
