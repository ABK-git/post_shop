import React from "react";
import ErrorMessagesContainer from "../form-error-message/error-messages.component";

//css
import {
  TextareaInputLabel,
  GroupContainer,
  TextareaInputContainer,
} from "./textarea-input.styles";

const TextareaInput = ({
  handleChange,
  label,
  value,
  errorMessage,
  ...otherProps
}) => (
  <GroupContainer>
    {label ? <TextareaInputLabel>{label}</TextareaInputLabel> : ""}
    <TextareaInputContainer
      onChange={handleChange}
      value={value ? value : ""}
      {...otherProps}
    />
    {errorMessage ? <ErrorMessagesContainer errorMessage={errorMessage} /> : ""}
  </GroupContainer>
);

export default TextareaInput;
