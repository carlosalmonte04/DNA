import RNFetchBlob from 'react-native-fetch-blob'
import newMeal from '../meals/newMeal'
import { AsyncStorage } from 'react-native'
// const apiUrl = "https://ana-api.herokuapp.com/api/v1/pictures"
const apiUrl = `https://ana-api.herokuapp.com/api/v1/meals`

export default function getResourceForStageOne(picturePath) {

  return async (dispatch) => {   
    const token = await AsyncStorage.getItem('token')

    if (token) {
      return RNFetchBlob.fetch('POST', apiUrl, {'Content-Type' : 'application/octet-stream', token: token}, RNFetchBlob.wrap(picturePath))
        .then(res => res.json() )
        .then(foodsAndMeal => {
          console.log("FOODS AND MEAL", foodsAndMeal)
          dispatch(newMeal(foodsAndMeal.frontEndMeal))
          return foodsAndMeal.foods
        })
        .catch((err) => {
          console.log("ERROR WHILE UPLOADING PICTURE ON PICTURE PATH:", picturePath, "GAVE ERROR ->", err)
        })
    }
  }
}
