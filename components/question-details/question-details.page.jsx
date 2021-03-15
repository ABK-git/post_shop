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
  MarginLeftDiv,
} from "./question-details.styles";
import SplitNewLine from "../split-new-line/split-new-line.component";
import { useCreateReply } from "../../apollo/actions";
import Spinner from "../spinner/spinner.component";
import DisplayUserImage from "../display-user-image/display-user-image.component";
import Reply from "../reply/reply.component";

const QuestionDetails = ({ question }) => {
  const router = useRouter();
  //質問一覧に戻る
  const clickToProductDetails = () => {
    router.push({
      pathname: `/product/${question.product._id}/details`,
      query: { openQuestions: true },
    });
  };

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

  return (
    <QuestionDetailsContainer>
      <CustomButton
        onClick={clickToProductDetails}
        design="to_list_and_margin-left">
        質問一覧に戻る
      </CustomButton>
      <QuestionBody>
        <FlexDiv>
          <DisplayUserImage image_pass={question.user.avatar} />
          <MarginLeftDiv>
            <QuestionTitle>{question.title}</QuestionTitle>
            <FlexDiv>
              <QuestionUser>質問者:{question.user.username}</QuestionUser>・
              <p>{moment(parseInt(question.createdAt)).fromNow()}</p>
            </FlexDiv>
            <SplitNewLine>{question.content}</SplitNewLine>
          </MarginLeftDiv>
        </FlexDiv>
      </QuestionBody>

      <RepliesLength>{question.replies.length}件の返信</RepliesLength>
      {question.replies &&
        question.replies.map((reply) => (
          <Reply key={reply._id} reply={reply} />
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
};

export default QuestionDetails;
