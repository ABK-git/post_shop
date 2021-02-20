import React, { useState, useContext } from "react";
import {
  ProductImagesContainer,
  ChevronLeftButton,
  ChevronRightButton,
  ImageIndex,
} from "./product-images.styles";
import Image from "react-image-resizer";
import MyContext from "../../context";

const DisplayProductImages = ({ images }) => {
  //配列の何番目の画像を表示するか
  const [index, setIndex] = useState(0);

  //context
  const my_context = useContext(MyContext);
  const { smBreakPoint } = my_context;

  //表示画像の変更
  const handleClickLeftButton = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };
  const handleClickRightButton = () => {
    if (index < images.length - 1) {
      setIndex(index + 1);
    }
  };
  //画像の番号
  const getImageIndex = (index+1) + "/"+ (images.length);

  return (
    <div>
      <ProductImagesContainer>
        <ChevronLeftButton
          onClick={handleClickLeftButton}
          getVisibility={index === 0}
        />
        <Image
          src={URL.createObjectURL(images[index])}
          width={smBreakPoint ? 250 : 160}
          height={smBreakPoint ? 200 : 130}
        />
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
