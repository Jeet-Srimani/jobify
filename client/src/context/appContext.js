import axios from "axios";
import { createContext, useContext, useReducer } from "react";

import reducer from "./reducer";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  // REGISTER_USER_BEGIN,
  // REGISTER_USER_SUCCESS,
  // REGISTER_USER_ERROR,
  // LOGIN_USER_BEGIN,
  // LOGIN_USER_SUCCESS,
  // LOGIN_USER_ERROR,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
} from "./actions";
const AppContext = createContext();

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
const userLocation = localStorage.getItem("location");

const initialState = {
  showAlert: false,
  alertText: "",
  alertType: "",
  isLoading: false,
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || "",
  jobLocation: "",
};

function AppProvier({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };
  const removeUserToLocalStorage = ({ user, token, location }) => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("location");
  };

  // const registerUser = async (currentUser) => {
  //   dispatch({ type: REGISTER_USER_BEGIN });
  //   try {
  //     const response = await axios.post("/api/v1/auth/register", currentUser);
  //     // console.log(response);
  //     const { user, token, location } = response.data;
  //     dispatch({
  //       type: REGISTER_USER_SUCCESS,
  //       payload: {
  //         user,
  //         token,
  //         location,
  //       },
  //     });
  //     addUserToLocalStorage({ user, token, location });
  //   } catch (err) {
  //     // console.log(err.response);
  //     dispatch({
  //       type: REGISTER_USER_ERROR,
  //       payload: { msg: err.response.data.msg },
  //     });
  //   }
  //   clearAlert();
  // };

  // const loginUser = async (currentUser) => {
  //   dispatch({ type: LOGIN_USER_BEGIN });
  //   try {
  //     const response = await axios.post("/api/v1/auth/login", currentUser);

  //     const { user, token, location } = response.data;
  //     dispatch({
  //       type: LOGIN_USER_SUCCESS,
  //       payload: {
  //         user,
  //         token,
  //         location,
  //       },
  //     });
  //     addUserToLocalStorage({ user, token, location });
  //   } catch (err) {
  //     // console.log(err.response);
  //     dispatch({
  //       type: LOGIN_USER_ERROR,
  //       payload: { msg: err.response.data.msg },
  //     });
  //   }
  //   clearAlert();
  // };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const response = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );

      const { user, token, location } = response.data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
          alertText,
        },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (err) {
      // console.log(err.response);
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: err.response.data.msg },
      });
    }
    clearAlert();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        // registerUser,
        // loginUser,
        setupUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

const useAppContext = () => {
  return useContext(AppContext);
};

export { useAppContext };
export default AppProvier;
