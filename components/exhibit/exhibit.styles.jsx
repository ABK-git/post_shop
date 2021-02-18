import styled from "styled-components";
import tw from "tailwind.macro";

export const ExhibitContainer = styled.div`
  ${tw`h-full w-full block text-center pt-8`}
`;

export const ContainerDropzone = styled.div`
  //ここだけheightのtailwindが効かない
  height: 20%;
  ${tw`w-1/2 h-1/5 border-8 border-indigo-600 border-dashed m-0 m-auto table`}
`;

export const DropzoneInput = styled.input`
  ${tw`h-full w-full`}
`;
export const DropzoneP = styled.p`
  ${tw`h-1/2 w-full  text-4xl font-bold text-red-800 text-red-500 
  m-0 m-auto table-cell align-middle`}
`;
