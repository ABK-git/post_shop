import styled from "styled-components";
import tw from "tailwind.macro";

export const DisplayCategoriesContainer = styled.div`
  ${tw`flex`}
`;

export const CategoryContainer = styled.p`
  ${tw`text-2xl font-bold bg-yellow-600 mr-4 rounded-l whitespace-no-wrap
  flex justify-center items-center cursor-pointer text-red-900
  hover:text-green-500 hover:bg-black hover:text-4xl`}
`;

export const TitleMessage = styled.p`
  font-family: "Playfair Display", serif;
  ${tw`text-3xl font-bold bg-red-700 mr-2 text-green-900 whitespace-no-wrap`};
`;

export const BorderCategory = styled.div`
  ${tw`flex border-4 border-purple-800 overflow-x-auto`}
`;

