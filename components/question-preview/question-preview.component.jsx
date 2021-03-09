import moment from "moment";
import React from "react";
import { QuestionContainer, TitleContainer } from "./question-preview.styles";

const QuestionPreview = ({ question }) => (
  <QuestionContainer>
    <TitleContainer>{question.title}</TitleContainer>
    <h1>{moment(parseInt(question.createdAt)).fromNow()}</h1>
  </QuestionContainer>
);

export default QuestionPreview;