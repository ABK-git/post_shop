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
} from "../../apollo/actions";
import QuestionPreview from "../question-preview/question-preview.component";
import ReviewForm from "../review-form/review-form.component";
import GraphQLErrorMessages from "../graphql-error-message/graphql-error-message.component";
import DisplayStars from "../display-stars/display-stars.component";
import { getEvaluationOfStars } from "../../utils/functions";
import MyContext from "../../context";
import Review from "../review/review.component";
import Spinner from "../spinner/spinner.component";
import Pagination from "material-ui-flat-pagination";

const ProductDetails = ({ product }) => {
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

  //商品をカートに入れる
  const onAddCart = () => {
    console.log("addCart");
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
        <GraphQLErrorMessages error={createQuestionError} />
      )}
      {createReviewError && <GraphQLErrorMessages error={createReviewError} />}
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
                  .slice(offsetQuestion, offsetQuestion + parPage)
                  .map((question) => (
                    <QuestionPreview
                      question={question}
                      product_id={product._id}
                      key={question._id}
                    />
                  ))}
              {product.questions.length > 5 && (
                <Pagination
                  limit={parPage}
                  offset={offsetQuestion}
                  total={product.questions.length}
                  onClick={(e, offSet) => setOffsetQuestion(offSet)}
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
                  .slice(offsetReview, offsetReview + parPage)
                  .map((review) => <Review key={review._id} review={review} />)}
              {product.reviews.length > 5 && (
                <Pagination
                  limit={parPage}
                  offset={offsetReview}
                  total={product.reviews.length}
                  onClick={(e, offSet) => setOffsetReview(offSet)}
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
      <CustomButton design="add_cart" onClick={onAddCart}>
        カートに入れる
      </CustomButton>
    </ProductDetailsContainer>
  );
};
export default ProductDetails;
