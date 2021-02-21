import React, { useState } from "react";
import withApollo from "../../hoc/withApollo";
import WithAuthenticated from "../../hoc/withAuthenticated";
import { useDropzone } from "react-dropzone";
import {
  ContainerDropzone,
  DropzoneInput,
  DropzoneP,
  ExhibitContainer,
  RegisterProductButton,
} from "./exhibit.styles";
import DisplayProductImages from "../display-product-images/product-images.component";
import axios from "axios";

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

  //画像のUPLoad構成
  const config = {
    headers: { "content-type": "multipart/form-data" },
    onUploadProgress: (event) => {
      console.log(
        `Current progress:`,
        Math.round((event.loaded * 100) / event.total)
      );
    },
  };

  //登録したファイルのpathを保管するstate
  const [imagesPass, setImagesPass] = useState([]);
  //ファイル登録
  const RegisterProductImages = async () => {
    if (images.length != 0) {
      const formData = new FormData();
      for (let i = 0; i < images.length; i++) {
        formData.append("files", images[i]);
      }
      const registerFiles = await axios
        .post("/api/product-images-upload", formData, config)
        .then(({ data: res }) => {
          return res.data;
        })
        .catch(() => {
          return null;
        });
      const getImagesPass = Object.values(registerFiles).map((registerFile) => {
        return registerFile.path.replaceAll("\\","/").replace("public","");
      })
      setImagesPass(getImagesPass);
    }
  };

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
        />
      )}
      <RegisterProductButton onClick={RegisterProductImages}>
        Submit
      </RegisterProductButton>
    </ExhibitContainer>
  );
};

export default withApollo(WithAuthenticated(Exhibit));
