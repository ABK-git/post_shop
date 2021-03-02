import { useRouter } from "next/router";
import { useEffect } from "react";
import { getProducts } from "../../apollo/actions/";

const Redirect = ({ to }) => {
  const router = useRouter();

  useEffect(() => {
    router.push({ pathname: to });
  }, []);

  return null;
};

export default Redirect;
