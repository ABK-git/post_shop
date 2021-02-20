import React, { useState } from "react";
import withApollo from "../../hoc/withApollo";
import WithAuthenticated from "../../hoc/withAuthenticated";
import { useDropzone } from "react-dropzone";
import {
  ContainerDropzone,
  DropzoneInput,
  DropzoneP,
  ExhibitContainer,
} from "./exhibit.styles";
import DisplayProductImages from "../display-product-images/product-images.component";

const Exhibit = () => {
  const [images, setImages] = useState([]);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/*",
    getFilesFromEvent: (event) => handleDrop(event),
  });

  const handleDrop = (event) => {
    const files = [];
    const fileList = event.dataTransfer
      ? event.dataTransfer.files
      : event.target.files;

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList.item(i);
      files.push(file);
    }
    if (files.length != 0) {
      setImages(files.concat(images));
    }
    return files;
  };
  //配列の何番目の画像を表示するか
  const [index, setIndex] = useState(0);
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
  //preview画像の削除機能
  const handleRemoveImage = () => {
    const newImages = images.filter((image) => {
      return image !== images[index];
    });
    setImages(newImages);
    if (index > 0) {
      setIndex(index - 1);
    }
  };
  //画像の番号
  const getImageIndex = index + 1 + "/" + images.length;

  return (
    <ExhibitContainer>
      <ContainerDropzone
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
        <DropzoneInput {...getInputProps()} />
        <DropzoneP>UPLOAD</DropzoneP>
      </ContainerDropzone>
      {images.length != 0 && (
        <DisplayProductImages
          images={images}
          index={index}
          handleClickLeftButton={handleClickLeftButton}
          handleClickRightButton={handleClickRightButton}
          handleRemoveImage={handleRemoveImage}
          getImageIndex={getImageIndex}
        />
      )}
    </ExhibitContainer>
  );
};

export default withApollo(WithAuthenticated(Exhibit));
