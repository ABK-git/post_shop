import React from "react";
import {
  GroupContainer,
  ImageOfFile,
  ImgContainer,
  NoneInput,
} from "./prepare-user-image.styles";

const PrepareUserImage = ({
  handleChangeSetFile,
  handleDeleteSetFile,
  file,
}) => (
  <GroupContainer>
    {file && (
      <ImageOfFile
        src={URL.createObjectURL(file)}
        onClick={handleDeleteSetFile}
      />
    )}
    <ImgContainer file={file}>
      <NoneInput
        accept="image/*"
        type="file"
        name="file"
        onChange={handleChangeSetFile}
      />
    </ImgContainer>
  </GroupContainer>
);

export default PrepareUserImage;
