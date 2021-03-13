import React, { useState, useRef, useEffect } from "react";
import {
  ProductDetailsContainer,
  CategoriesLeftJustify,
  OpenButtons,
  DisplayMessage,
  ToExhibit,
  LeftContainer,
  DisplayList,
} from "./product-details.styles";
import DisplayCategories from "../display-categories/display-categories.component";
import CustomButton from "../custom-button/custom-button.component";
import { useFormik } from "formik";
import * as Yup from "yup";
import QuestionForm from "../question-form/question-form.component";
import ProductContent from "../display-product-content/product-content.component";
import { useCreateQuestion, useCreateReview } from "../../apollo/actions";
import QuestionPreview from "../question-preview/question-preview.component";
import { useRouter } from "next/router";
import ReviewForm from "../review-form/review-form.component";

const ProductDetails = ({ product }) => {
  const router = useRouter();
  const { openQuestions } = router.query;
  const [displayQuestions, setDisplayQuestions] = useState(
    openQuestions ? true : false
  );
  const [switchQuestion, setSwitchQuestion] = useState(false);
  const [displayReviews, setDiplayReviews] = useState(false);
  const [switchReview, setSwitchReview] = useState(false);
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
    setDiplayReviews(false);
    setDisplayQuestions(!displayQuestions);
  };
  const changeDisplayReviews = () => {
    setDisplayQuestions(false);
    setDiplayReviews(!displayReviews);
  };
  const changeSwitchQuestion = () => {
    setSwitchQuestion(!switchQuestion);
  };
  const chageSwitchReview = () => {
    setSwitchReview(!switchReview);
  };

  const [createQuestion] = useCreateQuestion();
  const [createReview] = useCreateReview();

  /**
   * formik(Question)
   */
  const initialValues = {
    title: "",
    content: "",
    product: product._id,
  };
  const validationSchema = Yup.object({
    title: Yup.string()
      .required("質問のタイトルを入力してください")
      .max(255, "タイトルは255文字以内で入力してください"),
    content: Yup.string()
      .required("質問の内容を入力してください")
      .max(1000, "質問内容は1000文字以内で入力してください"),
  });
  const onSubmit = (values) => {
    createQuestion({ variables: values });
    setSwitchQuestion(!switchQuestion);
    values.content = "";
    values.title = "";
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  /**
   * formik(Review)
   */
  const initialReviewValues = {
    title: "",
    content: "",
    stars: 0,
    product: product._id,
  };
  const validationReviewSchema = Yup.object({
    title: Yup.string()
      .required("レビューのタイトルを入力してください")
      .max(255, "タイトルは255文字以内で入力してください"),
    content: Yup.string()
      .required("レビューの内容を入力してください")
      .max(1000, "レビュー内容は1000文字以内で入力してください"),
  });
  const onSubmitReview = (values) => {
    createReview({ variables: values });
    setSwitchReview(!switchReview);
    values.content = "";
    values.title = "";
    values.stars = 0;
  };
  const formikReview = useFormik({
    initialValues: initialReviewValues,
    validationSchema: validationReviewSchema,
    onSubmit: onSubmitReview,
  });
  const onChangeStars = (value) => {
    formikReview.setFieldValue("stars", value);
  };

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
        <CustomButton design="open_reviews" onClick={changeDisplayReviews}>
          Reviews
        </CustomButton>
      </OpenButtons>
      {displayQuestions && (
        <DisplayList>
          {switchQuestion && <QuestionForm formik={formik} />}
          {switchQuestion ? (
            <LeftContainer>
              <CustomButton design="to_list" onClick={changeSwitchQuestion}>
                質問一覧へ戻る
              </CustomButton>
            </LeftContainer>
          ) : (
            <div>
              <DisplayMessage>
                この商品に対する質問一覧 ({product.questions.length})
              </DisplayMessage>
              {product.questions &&
                product.questions.map((question) => (
                  <QuestionPreview
                    question={question}
                    product_id={product._id}
                    key={question._id}
                  />
                ))}
              <ToExhibit onClick={changeSwitchQuestion}>質問をする</ToExhibit>
            </div>
          )}
        </DisplayList>
      )}

      {displayReviews && (
        <DisplayList>
          {switchReview && (
            <ReviewForm formik={formikReview} onChange={onChangeStars}>
              form
            </ReviewForm>
          )}
          {switchReview ? (
            <LeftContainer>
              <CustomButton design="to_list" onClick={chageSwitchReview}>
                レビュー一覧へ戻る
              </CustomButton>
            </LeftContainer>
          ) : (
            <div>
              <DisplayMessage>
                この商品に対するレビュー一覧 ({product.reviews.length})
              </DisplayMessage>
              {product.reviews &&
                product.reviews.map((review) => <p>{review.content} Star: {review.stars}</p>)}
              <ToExhibit onClick={chageSwitchReview}>レビューする</ToExhibit>
            </div>
          )}
        </DisplayList>
      )}
    </ProductDetailsContainer>
  );
};
export default ProductDetails;
