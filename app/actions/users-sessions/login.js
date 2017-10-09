import {AsyncStorage} from 'react-native'
import toggleLoggedIn from '../ui/toggleLoggedIn'
import fetchUser from '../users-sessions/fetchUser'
import fetchAllMeals from '../meals/fetchAllMeals'

export default function login(userInfo) {
	return (dispatch) => {
		const apiUrl = `http://192.168.1.11:8000/api/v1/login`
		const requestData = {
			method: 'POST', 
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json',
	    },
			body: JSON.stringify(userInfo)
		}
		return fetch(apiUrl, requestData)
		.catch(error => console.log("Error while loging in user", error))
		.then(res => res.json())
		.then(json => {
			AsyncStorage.setItem('token', json.token)
			.then(() => AsyncStorage.getItem('token')
				.then(token => dispatch(toggleLoggedIn(!!token)) && dispatch(fetchUser(token)).then(() => dispatch(fetchAllMeals()) ) )
			)
		})
		.catch(error => console.log("Error while loging in user", error))
	}
}