import AsyncStorage from '@react-native-community/async-storage';
import { User } from '@dnaModels';
import setUser from './setUser';
import { API_URL } from 'config/env';

export default function fetchUser(token) {
	const apiUrl = `${API_URL}/me`;
	return dispatch => {
		const requestData = {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				token: token,
			},
		};
		return fetch(apiUrl, requestData)
			.catch(err =>
				console.log(
					'Error while getting /me, most likely network request, check url being requested',
					err,
				),
			)
			.then(res => res.json())
			.then(persistedUserInfo => {
				User.reset();
				const user = new User(persistedUserInfo);
				dispatch(setUser(user));
				return user;
			});
	};
}
