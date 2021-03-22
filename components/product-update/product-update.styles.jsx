import styled, { css } from "styled-components";
import tw from "tailwind.macro";

const acceptSuccess = css`
  ${tw`border-green-800 bg-blue-500`}
`;
const acceptReject = css`
  ${tw`border-red-500 bg-purple-600`}
`;

const DropzoneActions = ({ isDragAccept, isDragActive }) => {
  if (isDragActive) {
    if (isDragAccept) {
      return acceptSuccess;
    } else {
      return acceptReject;
    }
  }
};

export const Container = styled.div`
  ${tw`h-screen w-full py-8 flex flex-col items-center bg-gray-500 overflow-auto`}
`;

export const ContainerDropzone = styled.div`
  //ここだけheightのtailwindが効かない
  height: 20%;
  ${tw`w-1/2 h-1/5 border-8 border-indigo-600 border-dashed 
  text-center flex items-center justify-center bg-green-300`}
  ${DropzoneActions}
`;

export const DropzoneInput = styled.input`
  ${tw`h-full w-full`}
`;
export const DropzoneP = styled.p`
  ${tw`h-1/2 w-full text-5xl sm:text-7xl font-bold text-red-800 font-bigelow`}
`;