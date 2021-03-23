import styled from "styled-components";
import tw from "tailwind.macro";

import FormInput from "../form-input/form-input.component";
import TextareaInput from "../textarea-input/textarea-input.component";

export const ProductDetailsContainer = styled.div`
  ${tw`h-screen bg-gray-500 overflow-auto w-full py-6 flex flex-col items-center`}
`;

export const OpenButtons = styled.div`
  ${tw`mt-10 flex w-4/5 justify-around`}
`;

export const LeftJustify = styled.div`
  ${tw`w-full text-left pl-2`}
`;

export const DisplayList = styled.div`
  ${tw`w-4/5 mt-5 text-center`}
`;

export const DisplayMessage = styled.p`
  ${tw`font-bold text-2xl sm:text-4xl`}
`;

export const ToExhibit = styled.p`
  ${tw`text-green-900 font-semibold whitespace-no-wrap text-xl sm:text-3xl
  hover:text-gray-600 cursor-pointer text-left w-0`}
`;

export const LeftContainer = styled.div`
  ${tw`w-full text-left`}
`;

export const ExhibitQuestionForm = styled.div`
  ${tw`w-full bg-white p-2`}
`;

export const ExhibitQuestionFormLabel = styled.div`
  ${tw`text-left font-bold text-xl sm:text-3xl`}
`;

export const ExhibitTitleContainer = styled(FormInput)`
  ${tw`w-full border-2 border-blue-400 text-left focus:border-blue-400`}
`;

export const ExhibitContentContainer = styled(TextareaInput)`
  ${tw`w-full border-2 border-blue-400 text-left focus:border-blue-400`}
`;

export const Flex = styled.div`
  ${tw`flex`}
`;

export const EvaluationFont = styled.p`
  ${tw`font-bold text-xl sm:text-3xl`}
`;

export const PleaseLoginMessage = styled.p`
  ${tw`font-bold bg-blue-300 text-green-900 text-xl mt-3`}
`;

export const YourProduct = styled.p`
  ${tw`w-1/2 font-bold bg-purple-700 mt-4 text-white rounded-md
  hover:bg-red-700 hover:text-blue-900 text-center text-2xl`}
`;
