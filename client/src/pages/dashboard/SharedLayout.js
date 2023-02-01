import { Link, Outlet } from "react-router-dom";
import Wrapper from "../../assets/wrappers/SharedLayout";

function SharedLayout() {
  return (
    <Wrapper>
      <nav>
        <Link to="add-job">Add Job</Link>
        <Link to="all-jobs">All Jobs</Link>
      </nav>
      <Outlet />
    </Wrapper>
  );
}

export default SharedLayout;
