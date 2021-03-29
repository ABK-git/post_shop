import styled, { css } from "styled-components";
import tw from "tailwind.macro";
import DisplayStars from "../display-stars/display-stars.component";

const getHmBreakPoint = ({ hmBreakPoint }) => {
  if (hmBreakPoint) {
    return css`
      ${tw`w-1/2`}
    `;
  }
};

export const Container = styled.div`
  ${tw`p-3 text-center bg-red-400 w-full sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6`}
  ${getHmBreakPoint}
`;

export const ProductName = styled.h1`
  ${tw`text-2xl cursor-pointer font-bold bg-green-500 w-full mb-3 rounded-lg truncate`}
`;

export const ProductIntroduce = styled.div`
  ${tw`mx-auto bg-white mt-2`}
`;

export const OverhiddenRight = styled.div`
  ${tw`text-xl font-bold overflow-x-hidden font-medium truncate flex justify-end`}
`;

export const DisplayStartsContainer = styled(DisplayStars)`
  ${tw`mx-auto`}
`;

export const TextCenter = styled.div`
  ${tw`flex w-full text-start`}
`;
