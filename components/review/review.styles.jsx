import styled from "styled-components";
import tw from "tailwind.macro";

export const ReviewContainer = styled.div`
  ${tw`flex mt-2 w-full bg-white border-2 border-green-700 p-2`}
`;

export const TitleContainer = styled.p`
  ${tw`w-full text-left font-bold border-2 border-yellow-500 text-xl sm:text-3xl`}
`;

export const ExhibitUserContainer = styled.p`
  ${tw`text-gray-900 flex justify-start text-xl sm:text-3xl font-bold`}
`;

export const FlexAndEnd = styled.div`
  ${tw`flex justify-end`}
`;

export const FlexAndStart = styled.div`
  ${tw`flex justify-start`}
;`

export const TextLeft = styled.div`
  ${tw`text-left w-full`}
`;

export const MarginLeftDiv = styled.div`
  ${tw`ml-3 whitespace-no-wrap overflow-x-auto w-full`}
`;

export const CreatedAtContainer = styled.div`
  ${tw`ml-3`}
`;