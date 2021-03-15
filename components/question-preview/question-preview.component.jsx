import moment from "moment";
import React from "react";
import {
  QuestionContainer,
  TitleContainer,
  TextGrayContainer,
  UserAndRepliesLength,
  RepliesLength,
  TextLeft,
  MarginLeftDiv,
  Flex,
} from "./question-preview.styles";
import DisplayUserImage from "../display-user-image/display-user-image.component";

import Link from "next/link";

const QuestionPreview = ({ question, product_id }) => (
  <Link href={`/product/${product_id}/question/${question._id}`}>
    <QuestionContainer>
      <DisplayUserImage image_pass={question.user.avatar} />
      <MarginLeftDiv>
        <TitleContainer>{question.title}</TitleContainer>
        <UserAndRepliesLength>
          <TextLeft>
            <RepliesLength>返信数:{question.replies.length}</RepliesLength>
          </TextLeft>
        </UserAndRepliesLength>
        <Flex>
          <TextGrayContainer>
            投稿者: {question.user.username} / 投稿日:
            {moment(parseInt(question.createdAt)).fromNow()}
          </TextGrayContainer>
        </Flex>
      </MarginLeftDiv>
    </QuestionContainer>
  </Link>
);

export default QuestionPreview;
