
import styled, { css } from "styled-components";
import tw from "tailwind.macro";

const getHmBreakPoint = ({ hmBreakPoint }) => {
  if (hmBreakPoint) {
    return css`
      ${tw`w-1/2`}
    `;
  }
};
const getHover = ({ inCart }) => {
  if (inCart) {
    return css`
      &:hover {
        button {
          display: flex;
        }
        h1 {
          display: none;
        }
      }
    `;
  }
};

export const OrderPreviewContainer = styled.div`
  ${tw`p-5 text-center bg-red-400 w-full sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6`}
  ${getHmBreakPoint}
  ${getHover}
`;

export const ProductName = styled.h1`
  ${tw`text-2xl font-bold bg-green-500 w-full mb-3 rounded-lg truncate cursor-pointer`}
`;

export const TextRight = styled.div`
  ${tw`flex justify-end cursor-pointer`}
`;

export const LeftJutifyStart = styled.p`
  ${tw`flex justify-start font-semibold text-gray-800 text-lg`}
`;

export const AmountPrice = styled.p`
  ${tw`text-gray-800 font-bold text-xl whitespace-pre`}
`;

export const WhiteBackground = styled.div`
  ${tw`bg-white pt-4`}
`;

export const QuantityContainer = styled.p`
  ${tw`my-auto font-semibold text-xl`}
`;

export const BorderPrice = styled.hr`
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #fff;
  ${tw`border-4`}
`;

export const Flex = styled.div`
  ${tw`flex w-full justify-around`}
`;
