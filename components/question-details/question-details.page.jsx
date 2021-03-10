import React from "react";

const QuestionDetails = ({ question }) => {
  return (
    <div>
      <p>{question.title}</p>
      <p>{question.content}</p>
      <p>{question.createdAt}</p>
      <p>{question.user.username}</p>
      <p>{question.product._id}</p>
    </div>
  );
};

export default QuestionDetails;
