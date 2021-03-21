import React from "react";
//style
import { ErrorMessages } from "./error-messages.styles";

const ErrorMessagesContainer = ({ children }) => (
  <div>
    {Object.values({ children })
      .join()
      .split(",")
      .map((error, index) => (
        <ErrorMessages key={index}>{error}</ErrorMessages>
      ))}
  </div>
);

export default ErrorMessagesContainer;
