import styled, { css } from "styled-components";
import tw from "tailwind.macro";

export const NoneInput = styled.input`
  ${tw`hidden`}
`;

export const ImgContainer = styled.label`
  ${tw`block w-32 h-32 bg-cover mx-auto cursor-pointer rounded-full`}
  background-image: url("/images/user/no_user.png");
  ${(props) =>
    props.avatar
      ? css`
          background-image: url(${props.avatar});
        `
      : css`
          background-image: url("/images/user/no_user.png");
        `}
`;

export const GroupContainer = styled.div`
  ${tw`relative`}
`;

export const ImageOfFile = styled.img`
  ${tw`absolute w-32 h-32 rounded-full inset-0 m-auto cursor-pointer`}
`;
