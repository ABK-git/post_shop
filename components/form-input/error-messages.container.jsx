import React from "react";
//style
import { ErrorMessages } from "./form-input.styles";

const ErrorMessagesContainer = ({ errorMessage }) => (
  <div>
    {Object.values({ errorMessage })
      .join()
      .split(",")
      .map((error, index) => (
        <ErrorMessages key={index}>{error}</ErrorMessages>
      ))}
  </div>
);

export default ErrorMessagesContainer;
