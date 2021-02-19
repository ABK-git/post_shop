import React, { useState } from "react";
import withApollo from "../../hoc/withApollo";
import WithAuthenticated from "../../hoc/withAuthenticated";
import { useDropzone } from "react-dropzone";
import { ContainerDropzone, DropzoneInput, DropzoneP, ExhibitContainer } from "./exhibit.styles";
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

  return (
    <ExhibitContainer>
      <ContainerDropzone
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
        <DropzoneInput {...getInputProps()} />
        <DropzoneP>UPLOAD</DropzoneP>
      </ContainerDropzone>
      {(images.length != 0) && <DisplayProductImages images={images}/>}
    </ExhibitContainer>
  );
};

export default withApollo(WithAuthenticated(Exhibit));
