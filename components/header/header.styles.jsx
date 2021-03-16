import styled from "styled-components";
import tw from "tailwind.macro";

import Image from "react-image-resizer";
import DisplayUserImage from "../display-user-image/display-user-image.component";

export const HeaderContainer = styled.div`
  ${tw`flex flex-row bg-blue-600 h-16 pr-8`};
`;

export const HeaderOptionsLeft = styled.div`
  ${tw`h-full justify-center items-center flex ml-1`}
`;

export const HeaderOptionsRight = styled.div`
  ${tw`justify-end items-center sm:flex hidden  mt-0 mb-0 mr-0 ml-auto`}
`;

export const OptionsLink = styled.button`
  ${tw`font-bold text-2xl text-yellow-600 m-2 cursor-pointer`}
`;

export const MenuIcon = styled.img`
  ${tw`h-full w-8 h-8 mt-4 ml-auto cursor-pointer hover:opacity-75
  sm:hidden`}
`;

export const UserImage = styled(Image)`
  ${tw`rounded-full`}
`;

export const LiContainer = styled.li`
  ${tw`bg-green-300 text-red-600 border-2 border-blue-500`}
`;

export const MenuContainer = styled.div`
  ${tw`text-center`}
`

export const SubMenu = styled.div`
  ${tw`relative`}
`;

export const DisplayUserImageContainer = styled(DisplayUserImage)`
  ${tw`mx-auto cursor-pointer`}
`;
