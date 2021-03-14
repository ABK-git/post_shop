import React, { useContext } from "react";
import CustomButton from "../custom-button/custom-button.component";
import {
  ExhibitContentContainer,
  ExhibitTitleContainer,
  ExhibitReviewForm,
  ExhibitReviewFormLabel,
} from "./review-form.styles";
import MyContext from "../../context";
import DisplayStars from "../display-stars/display-stars.component";
import ErrorMessagesContainer from "../form-error-message/error-messages.component";

const ReviewForm = ({ formik, onChange }) => {
  //context
  const my_context = useContext(MyContext);
  const { smBreakPoint } = my_context;
  return (
    <ExhibitReviewForm>
      <ExhibitReviewFormLabel>タイトルまたは概要</ExhibitReviewFormLabel>
      <form onSubmit={formik.handleSubmit}>
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
        <DisplayStars
          onChange={onChange}
          value={formik.values.stars}
          size={smBreakPoint ? 40 : 25}
          isHalf={false}
        />
        {formik.errors.stars && (
          <ErrorMessagesContainer errorMessage={formik.errors.stars} />
        )}
        <CustomButton design="exhibit_question" type="submit">
          公開
        </CustomButton>
      </form>
    </ExhibitReviewForm>
  );
};

export default ReviewForm;
