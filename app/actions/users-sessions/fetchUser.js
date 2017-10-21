import { AsyncStorage } from 'react-native'
import User from '../../models/user'
import setUser from './setUser'

export default function fetchUser(token) {

	const apiUrl = `http://192.168.1.10:8000/api/v1/me`

	return (dispatch) => {
		const requestData = {
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json',
	      'token': token
	    },
		}
		return fetch(apiUrl, requestData)
		.then(res => res.json())
		.then(persistedUserInfo => {
			User.reset()
			const user = new User(persistedUserInfo)
			dispatch(setUser(user))
			return user
		})
	}
}