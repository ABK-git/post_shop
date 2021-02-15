import styled from "styled-components";
import tw from "tailwind.macro";

export const HeaderContainer = styled.div`
  ${tw`flex flex-row bg-blue-600 h-16`};
`;

export const HeaderOptionsLeft = styled.div`
  ${tw`h-full justify-center items-center flex ml-1`}
`;

export const HeaderOptionsRight = styled.div`
  ${tw`h-full justify-end items-center sm:flex w-full mr-1 hidden`}
`;

export const OptionsLink = styled.button`
  ${tw`font-bold text-xl text-yellow-600 m-2 cursor-pointer`}
`;

export const MenuIcon = styled.img`
  ${tw`h-full w-8 h-8 mt-4 mr-4 ml-auto cursor-pointer
  sm:hidden`}
`;
