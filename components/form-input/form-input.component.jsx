import React from "react";
import ErrorMessagesContainer from "../form-error-message/error-messages.component";
//css
import {
  FormInputLabel,
  GroupContainer,
  FormInputContainer,
} from "./form-input.styles";

const FormInput = ({
  handleChange,
  label,
  value,
  errorMessage,
  ...otherProps
}) => (
  <GroupContainer>
    {label && <FormInputLabel>{label}</FormInputLabel>}
    <FormInputContainer
      onChange={handleChange}
      value={value ? value : ""}
      {...otherProps}
    />
    {errorMessage && (
      <ErrorMessagesContainer>{errorMessage}</ErrorMessagesContainer>
    )}
  </GroupContainer>
);

export default FormInput;
