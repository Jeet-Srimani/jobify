import { useState, useEffect } from "react";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/RegisterPage";
import { Logo, FormRow, Alert } from "../components";
import { useNavigate } from "react-router-dom";

function Register() {
  const {
    user,
    isLoading,
    showAlert,
    displayAlert,
    // registerUser,
    // loginUser,
    setupUser,
  } = useAppContext();

  const navigate = useNavigate();

  const initialState = {
    name: "",
    email: "",
    password: "",
    isMember: true,
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const formSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password };
    if (isMember) {
      setupUser({
        currentUser,
        endPoint: "login",
        alertText: "Login successful! Redirecting...",
      });
    } else {
      setupUser({
        currentUser,
        endPoint: "register",
        alertText: "User created! Redirecting...",
      });
    }
    // console.log(e.target);
  };
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={formSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert type="danger">Error</Alert>}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>
        <button
          type="button"
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={() => {
            setupUser({
              currentUser: { email: "testUser@test.com", password: "123456" },
              endPoint: "login",
              alertText: "Login successful! Redirecting...",
            });
          }}
        >
          {isLoading ? "Loading..." : "demo this app"}
        </button>
        <p>
          {values.isMember ? "Not a member yet" : "Already a member?"}
          <button className="member-btn" type="button" onClick={toggleMember}>
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}

export default Register;
