export const getEvaluationOfStars = (reviews) => {
  let evaluation = 0;
  if (reviews.length != 0) {
    for (let i = 0; i < reviews.length; i++) {
      evaluation += reviews[i].stars;
    }
    evaluation = Math.floor((evaluation / reviews.length) * 10) / 10;
  }
  return evaluation;
};

import moment from "moment";

export const getSortActive = (startDate, endDate) => {
  if (
    moment(endDate)
      .startOf("days")
      .diff(moment(startDate).startOf("days"), "days") >= 0
  ) {
    return true;
  } else {
    return false;
  }
};

export const getWetherPast = (updatedAt, endDate) => {
  if (
    moment(endDate)
      .endOf("days")
      .diff(moment(Number(updatedAt))) > 0
  ) {
    return true;
  } else {
    return false;
  }
};

export const getWetherFuture = (updatedAt, startDate) => {
  if (
    moment(Number(updatedAt)).diff(moment(startDate).startOf("days")) > 0
  ) {
    return true;
  } else {
    return false;
  }
};
