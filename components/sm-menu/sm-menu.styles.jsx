import styled from "styled-components";
import tw from "tailwind.macro";

export const SmMenuContainer = styled.div`
  ${tw`h-screen w-32 sm:hidden bg-yellow-700 overflow-auto`}
`;

export const LogoutButton = styled.button`
  ${tw`font-bold text-xl m-2 cursor-pointer w-full text-green-400 block text-center m-0 p-0 border-2 border-red-600`}
`;