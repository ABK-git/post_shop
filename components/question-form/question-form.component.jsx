import React from "react";
import CustomButton from "../custom-button/custom-button.component";
import {
  ExhibitQuestionForm,
  ExhibitQuestionFormLabel,
  ExhibitTitleContainer,
  ExhibitContentContainer,
} from "./question-form.styles";

const QuestionForm = ({ formik }) => (
  <ExhibitQuestionForm>
    <ExhibitQuestionFormLabel>タイトルまたは概要</ExhibitQuestionFormLabel>
    <form onSubmit={formik.handleSubmit}>
      <ExhibitTitleContainer
        type="text"
        name="title"
        value={formik.values.title}
        handleChange={formik.handleChange}
        errorMessage={formik.errors.title}
        required
      />
      <ExhibitQuestionFormLabel>詳細(オプション)</ExhibitQuestionFormLabel>
      <ExhibitContentContainer
        name="content"
        maxLength="1000"
        rows="8"
        value={formik.values.content}
        handleChange={formik.handleChange}
        errorMessage={formik.errors.content}
      />
      <CustomButton design="exhibit_question" type="submit">
        公開
      </CustomButton>
    </form>
  </ExhibitQuestionForm>
);

export default QuestionForm;
