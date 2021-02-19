import React, { useContext } from "react";
import {
  ProductImagesContainer,
  ChevronLeftButton,
  ChevronRightButton,
} from "./product-images.styles";
import Image from "react-image-resizer";
import MyContext from "../../context";

const DisplayProductImages = ({ images }) => {
  //配列の何番目の画像を表示するか
  let index = 0;

  //context
  const my_context = useContext(MyContext);
  const { smBreakPoint } = my_context;

  return (
    <ProductImagesContainer>
      <ChevronLeftButton />
      <Image
        src={URL.createObjectURL(images[index])}
        width={smBreakPoint ? 250 : 160}
        height={smBreakPoint ? 200 : 130}
      />
      <ChevronRightButton />
    </ProductImagesContainer>
  );
};

export default DisplayProductImages;
