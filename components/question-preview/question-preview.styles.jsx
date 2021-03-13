import styled from "styled-components";
import tw from "tailwind.macro";

export const QuestionContainer = styled.div`
  ${tw`mt-2 w-full bg-white border-2 border-green-700 p-2 cursor-pointer`}
`;

export const TitleContainer = styled.p`
  ${tw`w-full text-left font-bold border-2 border-yellow-500 text-xl sm:text-3xl`}
`;

export const ExhibitUserContainer = styled.p`
  ${tw`text-gray-600`}
`;

export const RepliesLength = styled.p`
  ${tw`text-gray-600`}
`;

export const UserAndRepliesLength = styled.div`
  ${tw`flex justify-end`}
`;

export const TextLeft = styled.div`
  ${tw`text-left`}
`;