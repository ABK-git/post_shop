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
  ${tw`h-1/2 w-full text-5xl sm:text-7xl font-bold text-red-800 font-bigelow`}
`;

export const RegisterProductButton = styled.button`
  ${tw`w-50 h-30 text-3xl font-bold bg-blue-400 text-red-700 rounded-lg p-1 pt-0 mt-4
  hover:text-yellow-600 hover:bg-blue-700 hover:border-4 hover:border-green-600`}
`;