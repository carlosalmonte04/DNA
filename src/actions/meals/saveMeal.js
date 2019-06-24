import AsyncStorage from '@react-native-community/async-storage';
import Meal from '../../models/meal';
import addMeal from './addMeal';
import { API_URL } from 'config/env';

export default function saveMeal(meal) {
	const apiUrl = `${API_URL}/meals/${meal._id}`;
	return async dispatch => {
		const token = await AsyncStorage.getItem('token');

		if (token) {
			meal.completed = true;

			const mealData = {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					token: token,
				},
				method: 'PUT',
				body: JSON.stringify(meal),
			};
			return fetch(apiUrl, mealData)
				.then(res => res.json())
				.then(json => {
					const newMeal = new Meal(json.meal);
					dispatch(addMeal(newMeal));
				})
				.catch(error => console.log('error while updating meal', error));
		}
	};
}
