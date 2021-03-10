import React from "react";
import withApollo from "../../../../hoc/withApollo";
import { getDataFromTree } from "@apollo/react-ssr";
import { getQuestion } from "../../../../apollo/actions";
import Spinner from "../../../../components/spinner/spinner.component";
import QuestionDetails from "../../../../components/question-details/question-details.page";

const QuestionPage = ({ query }) => {
  const { data, loading } = getQuestion({
    variables: { id: query.question_id },
  });
  const question = (data && data.question) || {};
  if (loading) {
    return <Spinner />;
  }
  return <QuestionDetails question={question} />;
};
QuestionPage.getInitialProps = async ({ query }) => {
  return { query };
};

export default withApollo(QuestionPage, { getDataFromTree });
