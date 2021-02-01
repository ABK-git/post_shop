import styled from "styled-components";
import tw from "tailwind.macro";

export const SignUpMessage = styled.p`
  ${tw` text-center text-yellow-800 text-6xl`};
`;

export const SignUpForm = styled.form`
  ${tw`pt-5`};
`;

export const SignUpStart = styled.input`
  ${tw`bg-red-700 text-5xl rounded-md p-1
  hover:bg-red-600 hover:text-green-800`};
`;

export const SignUpContainer = styled.div`
  ${tw`text-center bg-gray-500 overflow-auto py-5 w-full h-full`}
`;
