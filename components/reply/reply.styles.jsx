import styled from "styled-components";
import tw from "tailwind.macro";

export const ReplyContainer = styled.div`
  ${tw`w-4/5 flex mx-auto mt-3 pb-3 border-2 border-green-700`}
`;

export const ReplyUser = styled.p`
  ${tw`text-2xl font-bold flex justify-start text-gray-700`}
`;

export const Content = styled.div`
  ${tw`ml-2`}
`;

export const TextGray = styled.p`
  ${tw`text-gray-700`}
`;