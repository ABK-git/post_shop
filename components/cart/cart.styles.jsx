import styled, { css } from "styled-components";
import tw from "tailwind.macro";

export const CartContainer = styled.div`
  ${tw`h-screen w-full py-5 flex flex-col items-center bg-gray-500 overflow-auto`}
`;

export const TitleMessage = styled.p`
  ${tw`font-bold text-3xl sm:text-5xl text-red-600 mb-1`}
`;

export const OrderPreviewContainer = styled.div`
  ${tw`w-full flex flex-wrap`}
`;

export const AmountCart = styled.p`
  ${tw`text-4xl sm:text-5xl font-extrabold mb-3`}
`;