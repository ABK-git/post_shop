import Link from "next/link";
import { LinkContainer } from "./my-link.styles";

const MyLink = ({ children, href, ...otherProps }) => (
  <Link href={href}>
    <LinkContainer {...otherProps}>{children}</LinkContainer>
  </Link>
);
export default MyLink;
