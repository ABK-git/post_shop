import { useRouter } from "next/dist/client/router";
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

  let new_content = [];
  //question.contentを改行で分割
  if (question.content.includes("\n")) {
    new_content = question.content.split("\n");
  } else {
    new_content.push(question.content);
  }
  const [reply, setReply] = useState("");
  const handleChange = (event) => {
    setReply(event.target.value);
  };
  const handleSubmit = () => {
    console.log("handleSubmit");
    console.log(reply);
  };

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
        {new_content && new_content.map((content) => <p>{content}</p>)}
      </QuestionBody>

      <ReplyContainer onSubmit={handleSubmit}>
        <ReplyTextareaInput
          name="reply"
          placeholder="返信を追加"
          maxLength="1000"
          rows="3"
          value={reply}
          handleChange={handleChange}
        />
        {reply && (
          <CustomButton design="reply_to_question" type="submit">
            公開
          </CustomButton>
        )}
      </ReplyContainer>
    </QuestionDetailsContainer>
  );
};

export default QuestionDetails;
