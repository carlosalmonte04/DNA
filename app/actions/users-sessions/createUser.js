import { AsyncStorage } from 'react-native'

export default function createUser(userInfo) {
	return (dispatch) => {
		const apiUrl = `http://192.168.1.11:8000/api/v1/users`
		const requestData = {
			method: 'POST', 
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json',
	    },
			body: JSON.stringify(userInfo)
		}
		return fetch(apiUrl, requestData)
		.catch(error => console.log("Error while creating user", error))
		.then(res => res.json())
		.then(user => {
			console.log("USER CREATED", user)
			AsyncStorage.setItem('token', user.token)
			return user
		})
	}
}