import styled, { css } from "styled-components";
import tw from "tailwind.macro";
import {
  PlusCircle,
  MinusCircle
} from "@styled-icons/boxicons-regular";


const getHmBreakPoint = ({ hmBreakPoint }) => {
  if (hmBreakPoint) {
    return css`${tw`w-1/2`}`
  }
};
export const OrderPreviewContainer = styled.div`
  ${tw`p-5 text-center bg-red-400 mb-3 w-full sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6`}
  ${getHmBreakPoint}
`;

export const ProductName = styled.p`
  ${tw`text-2xl font-bold bg-green-500 w-full mb-3 rounded-lg`}
`;

export const TextRight = styled.div`
  ${tw`flex justify-end`}
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
  ${tw`flex justify-center w-full content-around`}
`;

export const PlusCircleButton = styled(PlusCircle)`
  ${tw`flex justify-start w-8 ml-2 text-blue-600 hover:text-green-800`}
`;

export const MinusCircleButton = styled(MinusCircle)`
  ${tw`flex justify-end w-8 mr-2 text-red-600 hover:text-green-800`}
`;