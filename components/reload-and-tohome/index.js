import React, { useEffect } from "react";
import router from "next/router";

const ReloadAndToHome = () => {
  useEffect(() => {
    router.push("/").then(() => router.reload());
  }, []);

  return null;
};

export default ReloadAndToHome;