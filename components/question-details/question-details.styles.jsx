import styled from "styled-components";
import tw from "tailwind.macro";
import TextareaInput from "../textarea-input/textarea-input.component";
import Pagination from "material-ui-flat-pagination";
import SplitNewLine from "../split-new-line/split-new-line.component";

export const QuestionDetailsContainer = styled.div`
  ${tw`w-full pt-5 h-screen bg-gray-500 overflow-auto`}
`;

export const MainContent = styled.div`
  ${tw`w-full pt-5 text-center`}
`;

export const QuestionBody = styled.div`
  ${tw` w-4/5 mx-auto mt-3 pb-3 border-2 border-green-700`}
`;

export const QuestionTitle = styled.p`
  ${tw`font-bold text-3xl truncate`} 
`;

export const QuestionUser = styled.p`
  ${tw`flex justify-start text-gray-600`}
`;

export const FlexDiv = styled.div`
  ${tw`flex mb-3`}
`;

export const ReplyContainer = styled.div`
  ${tw`w-4/5 mx-auto`};
`;

export const ReplyTextareaInput = styled(TextareaInput)`
  ${tw`w-full border-2 border-gray-400 mt-3 text-gray-800`}
`;

export const RepliesLength = styled.p`
  ${tw`flex justify-center text-3xl text-gray-700`}
`;
export const MarginLeftDiv = styled.div`
  ${tw`ml-3 w-full truncate`}
`;

export const PaginationContainer = styled(Pagination)`
  ${tw`flex justify-center`}
`;

export const PleaseLoginMessage = styled.p`
  ${tw`font-bold bg-blue-300 text-green-900 text-xl mt-3 text-center`}
`;