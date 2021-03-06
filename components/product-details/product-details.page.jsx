import React, { useState, useContext } from "react";
import {
  ProductDetailsContainer,
  LeftJustify,
  OpenButtons,
  DisplayMessage,
  ToExhibit,
  LeftContainer,
  DisplayList,
  Flex,
  EvaluationFont,
  PleaseLoginMessage,
} from "./product-details.styles";
import DisplayCategories from "../display-categories/display-categories.component";
import CustomButton from "../custom-button/custom-button.component";
import { useFormik } from "formik";
import * as Yup from "yup";
import QuestionForm from "../question-form/question-form.component";
import ProductContent from "../display-product-content/product-content.component";
import {
  useCreateQuestion,
  useCreateReview,
  getAuthUser,
  useCreateOrder,
  plusOrderQuantity,
} from "../../apollo/actions";
import QuestionPreview from "../question-preview/question-preview.component";
import ReviewForm from "../review-form/review-form.component";
import GraphQLErrorMessages from "../graphql-error-message/graphql-error-message.component";
import DisplayStars from "../display-stars/display-stars.component";
import { getEvaluationOfStars } from "../../utils/functions";
import MyContext from "../../context";
import Review from "../review/review.component";
import Spinner from "../spinner/spinner.component";
import Pagination from "@material-ui/lab/Pagination";
import router from "next/router";

const ProductDetails = ({ product, orderedId }) => {
  const { data: { user } = {}, loading, error } = getAuthUser();

  const [displayQuestions, setDisplayQuestions] = useState(false);
  const [switchQuestion, setSwitchQuestion] = useState(false);
  const [displayReviews, setDiplayReviews] = useState(false);
  const [switchReview, setSwitchReview] = useState(false);

  //Pagination関連
  const [offsetQuestion, setOffsetQuestion] = useState(0);
  const [offsetReview, setOffsetReview] = useState(0);
  const parPage = 5;

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

  const [createQuestion, { error: createQuestionError }] = useCreateQuestion();
  const [createReview, { error: createReviewError }] = useCreateReview();
  const [createOrder, { error: createOrderError }] = useCreateOrder();
  const [plusQuantity] = plusOrderQuantity();

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
    stars: Yup.number().min("1", "評価を入力してください"),
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

  //レスポンシブデザイン
  const my_context = useContext(MyContext);
  const { smBreakPoint } = my_context;

  if (loading) <Spinner />;

  return (
    <ProductDetailsContainer>
      <LeftJustify>
        <DisplayCategories categories={product.categories} />
        <Flex>
          <EvaluationFont>
            {getEvaluationOfStars(product.reviews)}
          </EvaluationFont>
          <DisplayStars
            value={getEvaluationOfStars(product.reviews)}
            isEdit={false}
            size={smBreakPoint ? 40 : 25}
          />
          <EvaluationFont>({product.reviews.length})</EvaluationFont>
        </Flex>
      </LeftJustify>
      <ProductContent product={product} />
      <OpenButtons>
        <CustomButton design="open_questions" onClick={changeDisplayQuestions}>
          Questions
        </CustomButton>
        <CustomButton design="open_reviews" onClick={changeDisplayReviews}>
          Reviews
        </CustomButton>
      </OpenButtons>

      {createQuestionError && (
        <GraphQLErrorMessages>{createQuestionError}</GraphQLErrorMessages>
      )}
      {createReviewError && (
        <GraphQLErrorMessages>{createReviewError}</GraphQLErrorMessages>
      )}
      {createOrderError && (
        <GraphQLErrorMessages>{createOrderError}</GraphQLErrorMessages>
      )}

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
                product.questions
                  .slice(
                    offsetQuestion * parPage,
                    offsetQuestion * parPage + parPage
                  )
                  .map((question) => (
                    <QuestionPreview
                      question={question}
                      product_id={product._id}
                      key={question._id}
                    />
                  ))}
              {product.questions.length > 5 && (
                <Pagination
                  count={Math.ceil(product.questions.length / 5)}
                  page={offsetQuestion + 1}
                  onChange={(e, offSet) => {
                    setOffsetQuestion(offSet - 1);
                  }}
                  color="secondary"
                />
              )}
              {(user && (
                <ToExhibit onClick={changeSwitchQuestion}>質問をする</ToExhibit>
              )) || (
                <PleaseLoginMessage>
                  質問をするにはログインが必要です
                </PleaseLoginMessage>
              )}
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
                product.reviews
                  .slice(
                    offsetReview * parPage,
                    offsetReview * parPage + parPage
                  )
                  .map((review) => <Review key={review._id} review={review} />)}
              {product.reviews.length > 5 && (
                <Pagination
                  count={Math.ceil(product.reviews.length / 5)}
                  page={offsetReview + 1}
                  onChange={(e, offSet) => {
                    setOffsetReview(offSet - 1);
                  }}
                  color="secondary"
                />
              )}
              {(user && (
                <ToExhibit onClick={chageSwitchReview}>レビューする</ToExhibit>
              )) || (
                <PleaseLoginMessage>
                  レビューをするにはログインが必要です
                </PleaseLoginMessage>
              )}
            </div>
          )}
        </DisplayList>
      )}
      {user && user._id === product.user._id ? (
        <CustomButton
          design="add_cart"
          onClick={() => {
            router.push(`/product/${product._id}/update`);
          }}>
          編集画面へ
        </CustomButton>
      ) : (
        (orderedId !== null && (
          <CustomButton
            design="add_cart"
            onClick={() => {
              plusQuantity({ variables: { id: orderedId } });
            }}>
            カートに1追加
          </CustomButton>
        )) ||
        (user && (
          <CustomButton
            design="add_cart"
            onClick={() => {
              createOrder({ variables: { id: product._id } });
            }}>
            カートに入れる
          </CustomButton>
        ))
      )}
    </ProductDetailsContainer>
  );
};
export default ProductDetails;
