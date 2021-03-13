import React from "react";
import CustomButton from "../custom-button/custom-button.component";
import {
  ExhibitContentContainer,
  ExhibitTitleContainer,
  ExhibitReviewForm,
  ExhibitReviewFormLabel,
} from "./review-form.styles";

const ReviewForm = ({ formik }) => (
  <ExhibitReviewForm>
    <ExhibitReviewFormLabel>タイトルまたは概要</ExhibitReviewFormLabel>
    <form onSubmit={formik.onSubmit}>
      <ExhibitTitleContainer
        type="text"
        name="title"
        value={formik.values.title}
        handleChange={formik.handleChange}
        errorMessage={formik.errors.title}
        required
      />
      <ExhibitReviewFormLabel>レビュー内容</ExhibitReviewFormLabel>
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
  </ExhibitReviewForm>
);
export default ReviewForm;
