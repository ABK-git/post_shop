import styled from "styled-components";
import tw from "tailwind.macro";

import FormInput from "../form-input/form-input.component";
import TextareaInput from "../textarea-input/textarea-input.component";

export const ProductDetailsContainer = styled.div`
  ${tw`h-screen w-full py-6 flex flex-col items-center bg-gray-500 overflow-auto`}
`;

export const DetailsMain = styled.div`
  ${tw`pt-10 w-full flex flex-col items-center`}
`;

export const OpenButtons = styled.div`
  ${tw`mt-10 flex w-4/5 justify-around`}
`;

export const CategoriesLeftJustify = styled.div`
  ${tw`w-full text-left`}
`;

export const ProductIntroduceContainer = styled.div`
  ${tw`w-4/5 bg-white mt-5 border-4 border-green-700`}
`;

export const Introduce = styled.p`
  ${tw`text-2xl font-bold whitespace-no-wrap`}
`;

export const SetNameAndContent = styled.div`
  ${tw`flex`}
`;

export const InName = styled.p`
  ${tw`text-lg text-gray-600 font-semibold whitespace-no-wrap`}
`;

export const InContent = styled.p`
  ${tw`text-lg ml-1 whitespace-pre-line`}
`;

export const SetNameAndContentJustifyRight = styled.div`
  ${tw`flex justify-start mr-1 sm:w-1/3`}
`;

export const ExhibitDaysAndUserContainer = styled.div`
  ${tw`w-1/3 ml-auto`}
`;

export const DisplayQuestions = styled.div`
  ${tw`w-4/5 mt-10 text-center`}
`;

export const DisplayQuestionsMessage = styled.p`
  ${tw`font-bold text-2xl sm:text-4xl`}
`;

export const ToExhibitQuestion = styled.p`
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
