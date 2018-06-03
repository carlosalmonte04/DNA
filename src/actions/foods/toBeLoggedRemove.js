export default function toBeLoggedRemove(foodId) {
	return {
		type: 'REMOVE_FROM_TO_BE_LOGGED',
		payload: foodId
	}
}