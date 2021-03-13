import styled from "styled-components";
import tw from "tailwind.macro";

export const ErrorMessage = styled.p`
${tw`mt-2 w-full text-center bg-red-300 text-purple-600 text-2xl w-1/2 font-bold`}
`;

export const ErrorMessagesContainer = styled.div`
  ${tw`flex flex-col items-center w-full`}
`;