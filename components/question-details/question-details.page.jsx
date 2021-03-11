import { useRouter } from "next/router";
import React, { useState } from "react";
import CustomButton from "../custom-button/custom-button.component";
import moment from "moment";
import {
  QuestionBody,
  QuestionDetailsContainer,
  QuestionTitle,
  QuestionUser,
  FlexDiv,
  ReplyContainer,
  ReplyTextareaInput,
  RepliesLength,
} from "./question-details.styles";
import SplitNewLine from "../split-new-line/split-new-line.component";
import { useCreateReply } from "../../apollo/actions";
import Spinner from "../spinner/spinner.component";
import ReloadAndToHome from "../reload-and-tohome";

const QuestionDetails = ({ question }) => {
  const router = useRouter();
  //質問一覧に戻る
  const clickToProductDetails = () => {
    router.push({
      pathname: `/product/${question.product._id}/details`,
      query: { openQuestions: true },
    });
  };

  let new_content = [];
  //question.contentを改行で分割
  if (question.content.includes("\n")) {
    new_content = question.content.split("\n");
  } else {
    new_content.push(question.content);
  }

  const [createReply, { loading }] = useCreateReply();
  const [content, setContent] = useState("");
  const handleChange = (event) => {
    setContent(event.target.value);
  };
  const handleSubmit = () => {
    const variables = { content, question: question._id };
    createReply({ variables });
    setContent("");
  };
  if (loading) {
    <Spinner />;
  }

  try {
    return (
      <QuestionDetailsContainer>
        <CustomButton
          onClick={clickToProductDetails}
          design="to_list_and_margin-left">
          質問一覧に戻る
        </CustomButton>
        <QuestionBody>
          <QuestionTitle>{question.title}</QuestionTitle>
          <FlexDiv>
            <QuestionUser>質問者:{question.user.username}</QuestionUser>・
            <p>{moment(parseInt(question.createdAt)).fromNow()}</p>
          </FlexDiv>
          {new_content &&
            new_content.map((content, index) => <p key={index}>{content}</p>)}
        </QuestionBody>
        <RepliesLength>{question.replies.length}件の返信</RepliesLength>
        {question.replies &&
          question.replies.map((reply) => (
            <QuestionBody key={reply._id}>
              <QuestionUser>{reply.user.username}</QuestionUser>
              <p>{moment(parseInt(reply.createdAt)).fromNow()}</p>
              <SplitNewLine>{reply.content}</SplitNewLine>
            </QuestionBody>
          ))}
        <ReplyContainer>
          <ReplyTextareaInput
            name="reply"
            placeholder="返信を追加"
            maxLength="1000"
            rows="3"
            value={content}
            handleChange={handleChange}
          />
          {content && (
            <CustomButton design="reply_to_question" onClick={handleSubmit}>
              公開
            </CustomButton>
          )}
        </ReplyContainer>
      </QuestionDetailsContainer>
    );
  } catch (e) {
    return <ReloadAndToHome/>
  }
};

export default QuestionDetails;
