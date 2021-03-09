import styled from "styled-components";
import tw from "tailwind.macro";

export const GroupContainer = styled.div`
  ${tw`flex flex-col items-center text-lg`}
`;

export const TextareaInputContainer = styled.textarea`
  ${tw`w-1/2 font-bold text-purple-400 rounded-md mb-2`}
`;

export const TextareaInputLabel = styled.label`
  ${tw`font-bold m-0 text-2xl`}
`;
