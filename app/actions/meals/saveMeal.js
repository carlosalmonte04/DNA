import { AsyncStorage } from 'react-native';
import Meal from '../../models/meal'
import addMeal from './addMeal'

export default function saveMeal(meal) {
const apiUrl = `http://192.168.1.11:8000/api/v1/meals/${meal._id}`
	return async (dispatch) => {

		const token = await AsyncStorage.getItem('token')

		if (token) {
			const mealData = {
		    headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json',
		      'token': token
		    },
				method: 'PUT', 
				body: JSON.stringify(meal)
			}
			return fetch(apiUrl, mealData)
			.then(res => res.json())
			.then(json => {
				const newMeal = new Meal(json.meal) 
				dispatch(addMeal(newMeal))
			})
			.catch(error => console.log("error while updating meal", error))
		}
	}
}