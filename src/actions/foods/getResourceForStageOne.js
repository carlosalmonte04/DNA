import RNFetchBlob from "react-native-fetch-blob";
import newMeal from "../meals/newMeal";
import { AsyncStorage } from "react-native";
import { API_URL } from "react-native-dotenv";
const apiUrl = `${API_URL}/meals`;

export default function getResourceForStageOne(picturePath) {
  return async dispatch => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      console.log("GOT TOKEN", token);
      return RNFetchBlob.fetch(
        "POST",
        apiUrl,
        { "Content-Type": "application/octet-stream", token: token },
        RNFetchBlob.wrap(picturePath)
      )
        .then(res => {
          console.log(res);
          return res.json();
        })
        .then(foodsAndMeal => {
          console.log("FOODS AND MEAL", foodsAndMeal);
          dispatch(newMeal(foodsAndMeal.frontEndMeal));
          return foodsAndMeal.foods;
        })
        .catch(err => {
          console.log(
            "ERROR WHILE UPLOADING PICTURE ON PICTURE PATH:",
            picturePath,
            "GAVE ERROR ->",
            err
          );
        });
    }
  };
}
