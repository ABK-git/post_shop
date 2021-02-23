import styled from "styled-components";
import tw from "tailwind.macro";

export const HomeContainer = styled.div`
  ${tw`h-screen w-full text-center py-5 overflow-auto bg-gray-500`}
`;

export const HomeTitleMessage = styled.h1`
  ${tw`text-green-600 font-bold text-2xl sm:text-5xl`}
`;

export const ProductsLayout = styled.table`
  ${tw`table w-4/5 h-11/12 mx-auto`}
`;
