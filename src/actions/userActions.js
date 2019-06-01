import { AsyncStorage } from "react-native";
import { API_URL } from "react-native-dotenv";
import { User } from "@dnaModels";
import {
  getAPIEndpoint,
  defaultAPIReqData,
  getUserProfileWithToken
} from "@dnaHelpers";
import * as T from "./types";
import {
  toggleLoggedIn,
  navigateToDashboard,
  toggleSignUpFormCompleted
} from "./uiActions";
import { fetchAllMeals } from "./mealsActions";

const apiUrl = `${API_URL}/login`;

export const userReset = () => {
  return {
    type: "RESET_USER"
  };
};

export const setUser = user => {
  return {
    type: T.SET_USER,
    payload: { user }
  };
};

export const setUserToken = token => ({
  type: T.SET_USER_TOKEN,
  payload: { token }
});

export const userLoggedInSuccess = (token) => async dispatch => {
  dispatch(fetchAllMeals(token));
};

export const createUser = userInfo => {
  return async dispatch => {
    const requestData = defaultAPIReqData({ body: JSON.stringify(userInfo) });
    try {
      const userRes = await fetch(getAPIEndpoint("/users"), requestData);
      const user = userRes.json();
      const { token } = user;
      console.log("*User - created", user);

      dispatch(setUserToken(token));
      console.log("*User - token saved");
    } catch (err) {
      console.log("**User - creating user", err);
    }
  };
};

export const fetchUser = token => {
  return async dispatch => {
    try {
      const userProfile = await getUserProfileWithToken(token);
      const user = new User(userProfile);

      User.reset();

      dispatch(setUser(user));
      console.log("*User - fetched");
    } catch (err) {
      console.log("**User - fetching user", err);
    }
  };
};

export const login = userInfo => {
  return async dispatch => {
    const requestData = defaultAPIReqData({
      method: "POST",
      body: JSON.stringify(userInfo)
    });

    try {
      const tokenRes = await fetch(getAPIEndpoint("/login"), requestData);
      const { token } = await tokenRes.json();

      console.log("***User - token from login", token);

      dispatch(setUserToken(token));
      await dispatch(fetchUser(token));
      dispatch(toggleLoggedIn(!!token));

      await dispatch(userLoggedInSuccess(token));

      console.log("*User - logged in");
    } catch (err) {
      console.log("**User - login", err);
    }
  };
};

export const saveUserSignUpInfo = (userInfo, navigate) => {
  const apiUrl = `${API_URL}/users`;

  return dispatch => {
    if (navigate) {
      navigate("NutrientsAnalyser");
      return null;
    }

    return AsyncStorage.getItem("token").then(token => {
      const requestData = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token
        },
        method: "PUT",
        body: JSON.stringify(userInfo)
      };
      fetch(apiUrl, requestData)
        .catch(error =>
          console.log("Error while sending signup user info", error)
        )
        .then(res => res.json())
        .catch(error =>
          console.log(
            "Error while converting user to JSON saving signup info",
            error
          )
        )
        .then(persistedUserInfo => {
          const user = new User(persistedUserInfo);
          dispatch(setUser(user));
        });
    });
  };
};
