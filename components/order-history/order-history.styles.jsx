import styled from "styled-components";
import tw from "tailwind.macro";

export const Container = styled.div`
  ${tw`h-screen w-full py-5 flex flex-col items-center bg-gray-500 overflow-auto`}
`;

export const TitleMessage = styled.p`
  ${tw`font-bold text-3xl sm:text-5xl text-red-600`}
`;

export const OrderPreviewContainer = styled.div`
  ${tw`w-full flex flex-wrap`}
`;

export const Buttons = styled.div`
  ${tw`w-full flex justify-start ml-3 mb-1`}
`;

export const DropDownContainer = styled.li`
  ${tw`inline-block relative`}
`;

export const UlContainer = styled.ul`
  ${tw`absolute text-center w-full`}
`;

export const LiItem = styled.li`
  ${tw`bg-white w-full border-2 border-indigo-600 text-blue-400 ml-1 cursor-pointer`}
`;