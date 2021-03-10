import { useRouter } from "next/dist/client/router";
import React from "react";
import CustomButton from "../custom-button/custom-button.component";
import {
  MainContent,
  QuestionDetailsContainer,
} from "./question-details.styles";

const QuestionDetails = ({ question }) => {
  const router = useRouter();
  //質問一覧に戻る
  const clickToProductDetails = () => {
    router.push({
      pathname: `/product/${question.product._id}/details`,
      query: { openQuestions: true },
    });
  };
  return (
    <QuestionDetailsContainer>
      <CustomButton onClick={clickToProductDetails} design="to_list">
        質問一覧に戻る
      </CustomButton>
      <MainContent>
        <p>{question.title}</p>
        <p>{question.content}</p>
        <p>{question.createdAt}</p>
        <p>{question.user.username}</p>
        <p>{question.product._id}</p>
      </MainContent>
    </QuestionDetailsContainer>
  );
};

export default QuestionDetails;
