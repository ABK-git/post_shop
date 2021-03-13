import moment from "moment";
import React from "react";
import {
  QuestionContainer,
  TitleContainer,
  ExhibitUserContainer,
  UserAndRepliesLength,
  RepliesLength,
  TextLeft,
} from "./question-preview.styles";

import Link from "next/link";

const QuestionPreview = ({ question, product_id }) => (
  <Link href={`/product/${product_id}/question/${question._id}`}>
    <QuestionContainer>
      <TitleContainer>{question.title}</TitleContainer>
      <UserAndRepliesLength>
        <TextLeft>
          <ExhibitUserContainer>
            投稿者: {question.user.username}
          </ExhibitUserContainer>
          <RepliesLength>返信数:{question.replies.length}</RepliesLength>
        </TextLeft>
      </UserAndRepliesLength>
      <h1>{moment(parseInt(question.createdAt)).fromNow()}</h1>
    </QuestionContainer>
  </Link>
);

export default QuestionPreview;
