import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import ErrorImage from "../assets/images/not-found.svg";

function Error() {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={ErrorImage} alt="not found" />
        <h3>Ohh! page not found</h3>
        <p>We can't seem to find th page you're looking for</p>
        <Link to="/">back home</Link>
      </div>
    </Wrapper>
  );
}

export default Error;
