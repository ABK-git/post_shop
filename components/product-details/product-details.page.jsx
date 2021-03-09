import React, { useState } from "react";
import moment from "moment";
import {
  ProductDetailsContainer,
  CategoriesLeftJustify,
  OpenButtons,
  DisplayQuestions,
  DisplayQuestionsMessage,
  ToExhibitQuestion,
  LeftContainer,
} from "./product-details.styles";
import DisplayCategories from "../display-categories/display-categories.component";
import CustomButton from "../custom-button/custom-button.component";
import { useFormik } from "formik";
import * as Yup from "yup";
import QuestionForm from "../question-form/question-form.component";
import ProductContent from "../display-product-content/product-content.component";
import { useCreateQuestion } from "../../apollo/actions";

const ProductDetails = ({ product }) => {
  const [displayQuestions, setDisplayQuestions] = useState(false);
  const [exhibitOrList, setExhibitOrList] = useState(false);
  const changeDisplayQuestions = () => {
    setDisplayQuestions(!displayQuestions);
  };
  const changeExhibitOrList = () => {
    setExhibitOrList(!exhibitOrList);
  };

  const [createQuestion, { error, loading }] = useCreateQuestion();

  /**
   * formik
   */
  const initialValues = {
    title: "",
    content: "",
  };
  const validationSchema = Yup.object({
    title: Yup.string()
      .required("titleを入力してください")
      .max(255, "titleは255文字以内で入力してください"),
    content: Yup.string()
      .required("contentを入力してください")
      .max(1000, "質問内容は1000文字以内で入力してください"),
  });
  const onSubmit = (values) => {
    values.product = product._id;
    createQuestion({ variables: values });
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <ProductDetailsContainer>
      <CategoriesLeftJustify>
        <DisplayCategories categories={product.categories} />
      </CategoriesLeftJustify>
      <ProductContent product={product} />
      <OpenButtons>
        <CustomButton design="open_questions" onClick={changeDisplayQuestions}>
          Questions
        </CustomButton>
        <CustomButton design="open_reviews">Reviews</CustomButton>
      </OpenButtons>
      <DisplayQuestions>
        {displayQuestions && (
          <div>
            {!exhibitOrList && <QuestionForm formik={formik} />}
            {exhibitOrList ? (
              <div>
                <DisplayQuestionsMessage>
                  この商品に対する質問一覧
                </DisplayQuestionsMessage>
                <ToExhibitQuestion onClick={changeExhibitOrList}>
                  質問をする
                </ToExhibitQuestion>
              </div>
            ) : (
              <LeftContainer>
                <CustomButton design="to_list" onClick={changeExhibitOrList}>
                  質問一覧へ戻る
                </CustomButton>
              </LeftContainer>
            )}
          </div>
        )}
      </DisplayQuestions>
    </ProductDetailsContainer>
  );
};
export default ProductDetails;
