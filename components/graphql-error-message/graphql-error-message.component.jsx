import React, { useState, useEffect } from "react";
//style
import {
  ErrorMessage,
  ErrorMessagesContainer,
} from "./graphql-error-message.styles";

const GraphQLErrorMessages = ({ children }) => {
  const [errorMessages, setErrorMessages] = useState([children]);
  useEffect(() => {
    setTimeout(() => {
      setErrorMessages([]);
    }, 2500);
  }, []);

  return (
    <ErrorMessagesContainer>
      {errorMessages &&
        Object.values({ errorMessages })
          .join()
          .split(",")
          .map((error, index) => (
            <ErrorMessage key={index}>
              {error.replace("Error: GraphQL error: ", "")}
            </ErrorMessage>
          ))}
    </ErrorMessagesContainer>
  );
};

export default GraphQLErrorMessages;
