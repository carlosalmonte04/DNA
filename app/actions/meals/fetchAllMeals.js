import setAllMealsInState from './setAllMealsInState'
import Meal from '../../models/meal'
import toggleDashboardLoading from '../../actions/ui/toggleDashboardLoading'
import { AsyncStorage } from 'react-native'
import { API_URL } from 'react-native-dotenv'

export default function fetchAllMeals() {

	return async (dispatch) => {
		const apiUrl = `${API_URL}/meals/`
		const token = await AsyncStorage.getItem('token')
		const requestData = {
			method: 'GET',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json',
	      'token': token
	    },
		}

		return fetch(apiUrl, requestData)
		.then(res => res.json())
		.catch( error => console.log("error while getting all users meals", error))
		.then(allMealsResponse => {
			console.log("ALL MEALS RESPONSE", allMealsResponse)
			const mealsCollection = allMealsResponse.map(meal => new Meal(meal))
			dispatch(setAllMealsInState(mealsCollection))
			dispatch(toggleDashboardLoading(false))
			return mealsCollection
		})
		
	}

}