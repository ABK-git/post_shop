import styled from "styled-components";
import tw from "tailwind.macro";

export const ExhibitContainer = styled.div`
  ${tw`h-full w-full pt-8 flex flex-col items-center`}
`;

export const ContainerDropzone = styled.div`
  //ここだけheightのtailwindが効かない
  height: 20%;
  ${tw`w-1/2 h-1/5 border-8 border-indigo-600 border-dashed text-center flex items-center justify-center`}
`;

export const DropzoneInput = styled.input`
  ${tw`h-full w-full`}
`;
export const DropzoneP = styled.p`
  ${tw`h-1/2 w-full text-3xl sm:text-5xl font-bold text-red-800 font-abir`}
`;
