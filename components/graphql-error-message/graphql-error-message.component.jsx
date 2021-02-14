import React, {useState,useEffect} from "react";
//style
import {
  ErrorMessage,
  ErrorMessagesContainer,
} from "./graphql-error-message.styles";

const GraphQLErrorMessages = ({ error }) => {
  const [errorMessages, setErrorMessages] = useState([error])
  useEffect(() => {
    setTimeout(() => {
      setErrorMessages([])
    },2500)
  }, [])

  return (
    <ErrorMessagesContainer>
      {Object.values({ errorMessages })
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
