import styled from "styled-components";
import tw from "tailwind.macro";

export const GroupContainer = styled.div`
  ${tw`flex flex-col items-center text-2xl mb-4`};
`;

export const FormInputLabel = styled.div`
  ${tw`w-full font-bold`};
`;

export const FormInputContainer = styled.input`
  ${tw`w-full text-purple-400 font-bold w-1/2 text-center rounded-md`};
`;

export const ErrorMessages = styled.span`
  ${tw`font-bold bg-red-300 text-purple-600 border-l-4 border-red-600`}
`;
