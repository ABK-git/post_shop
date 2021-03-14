export const getEvaluationOfStars = (reviews) => {
  let evaluation = 0;
  if (reviews.length != 0) {
    for(let i = 0; i < reviews.length; i++){
      evaluation += reviews[i].stars;
    }
    evaluation = Math.floor((evaluation / reviews.length) * 10) / 10;
  }
  return evaluation;
};
