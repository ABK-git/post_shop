import React from "react";
import moment from "moment";
import {
  ReviewContainer,
  TitleContainer,
  FlexAndEnd,
  TextLeft,
  ExhibitUserContainer,
  FlexAndStart,
} from "./review.styles";
import SplitNewLine from "../split-new-line/split-new-line.component";
import DisplayStars from "../display-stars/display-stars.component";

const Review = ({ review }) => (
  <ReviewContainer>
    <TitleContainer>{review.title}</TitleContainer>
    <FlexAndStart>
      <DisplayStars value={review.stars} isEdit={false} />
    </FlexAndStart>
    <FlexAndEnd>
      <ExhibitUserContainer>
        投稿者: {review.user.username}
      </ExhibitUserContainer>
    </FlexAndEnd>
    <SplitNewLine>{review.content}</SplitNewLine>
    <h1>{moment(parseInt(review.createdAt)).fromNow()}</h1>
  </ReviewContainer>
);

export default Review;
