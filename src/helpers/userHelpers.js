import { getAPIEndpoint, defaultAPIReqData } from "@dnaHelpers";

export const getUserProfileWithToken = async token => {
  const requestData = defaultAPIReqData({ token });
  try {
    const userRes = await fetch(getAPIEndpoint("/me"), requestData);
    const userProfile = await userRes.json();

    console.log("*User - returning user profile", userProfile);
    return userProfile;
  } catch (err) {
    console.log("**User - get user profile", err, token);
  }
};
