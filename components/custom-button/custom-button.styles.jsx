import styled, { css } from "styled-components";
import tw from "tailwind.macro";

const openQuestions = css`
  ${tw`md:w-1/5 bg-red-600 border-red-500 border-4
  hover:bg-yellow-400 hover:text-blue-800 `}
`;

const openReviews = css`
  ${tw`md:w-1/5 bg-green-600 border-green-500 border-4
  hover:bg-yellow-400 hover:text-blue-800 `}
`;

const toList = css`
  ${tw`bg-white text-blue-500 border-2 border-blue-500
  hover:text-black hover:border-black`}
`;

const toListAndMarginLeft = css`
  ${tw`bg-white text-blue-500 border-2 border-blue-500 ml-4
   hover:text-black hover:border-black`}
`;

const exhibitQuestion = css`
  ${tw`bg-red-600 hover:opacity-75 border-3 border-blue-700 w-full mt-2`}
`;

const replyQuestion = css`
  ${tw`bg-red-600 hover:opacity-75 border-3 border-blue-700 w-full mt-0`}
`;

const getButtonStyles = ({ design }) => {
  switch (design) {
    case "open_questions":
      return openQuestions;

    case "open_reviews":
      return openReviews;

    case "to_list":
      return toList;

    case "exhibit_question":
      return exhibitQuestion;

    case "to_list_and_margin-left":
      return toListAndMarginLeft;

    case "reply_to_question":
      return replyQuestion;

    default:
      return "";
  }
};

export const CustomButtonContainer = styled.button`
  ${tw`font-bold cursor-pointer text-2xl inline-block`}

  ${getButtonStyles}
`;
