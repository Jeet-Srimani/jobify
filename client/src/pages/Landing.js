import React from "react";
import { Logo } from "../components";
import { Link, Navigate } from "react-router-dom";
import main from "../assets/images/main.svg";
import { Wrapper } from "../assets/wrappers/Wrapper";
import { useAppContext } from "../context/appContext";

function Landing() {
  const { user } = useAppContext();

  return (
    <React.Fragment>
      {user && <Navigate to="/" />}
      <Wrapper>
        <nav>
          <Logo />
        </nav>
        <div className="container page">
          <div className="info">
            <h1>
              job <span>tracking</span> app
            </h1>
            <p>
              asdasvsdgvb wer terge rgerg erger sadasd asdas das
              twertwetyewrtewrtgertert fwsedfsdfsdfsdfdsfsd gsdfg e4rte
              gtertergdf
            </p>
            <Link to="/register" className="btn btn-hero">
              Login/Register
            </Link>
          </div>
          <img src={main} alt="job hunt" className="img main-img" />
        </div>
      </Wrapper>
    </React.Fragment>
  );
}

export default Landing;
