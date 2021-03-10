import React, { useState, useRef, useEffect } from "react";
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
import QuestionPreview from "../question-preview/question-preview.component";
import { useRouter } from "next/router";

const ProductDetails = ({ product }) => {
  const router = useRouter();
  const { openQuestions } = router.query;
  const [displayQuestions, setDisplayQuestions] = useState(
    openQuestions ? true : false
  );
  const [exhibitOrList, setExhibitOrList] = useState(
    openQuestions ? false : openQuestions === undefined ? false : true
  );
  const clearQuery = () => {
    router.replace(
      `/product/${product._id}/details`,
      `/product/${product._id}/details`,
      { shallow: true }
    );
  };
  const ref = useRef(null);

  useEffect(() => {
    if (openQuestions) {
      ref.current = setTimeout(() => {
        clearQuery();
      }, 100);
    }
    return () => {
      clearTimeout(ref.current);
    };
  }, [openQuestions]);
  const changeDisplayQuestions = () => {
    setDisplayQuestions(!displayQuestions);
  };
  const changeExhibitOrList = () => {
    setExhibitOrList(!exhibitOrList);
  };

  const [createQuestion] = useCreateQuestion();

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
    setExhibitOrList(!exhibitOrList);
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
            {exhibitOrList && <QuestionForm formik={formik} />}
            {exhibitOrList ? (
              <LeftContainer>
                <CustomButton design="to_list" onClick={changeExhibitOrList}>
                  質問一覧へ戻る
                </CustomButton>
              </LeftContainer>
            ) : (
              <div>
                <DisplayQuestionsMessage>
                  この商品に対する質問一覧
                </DisplayQuestionsMessage>
                {product.questions &&
                  product.questions.map((question) => (
                    <QuestionPreview
                      question={question}
                      product_id={product._id}
                      key={question._id}
                    />
                  ))}
                <ToExhibitQuestion onClick={changeExhibitOrList}>
                  質問をする
                </ToExhibitQuestion>
              </div>
            )}
          </div>
        )}
      </DisplayQuestions>
    </ProductDetailsContainer>
  );
};
export default ProductDetails;
