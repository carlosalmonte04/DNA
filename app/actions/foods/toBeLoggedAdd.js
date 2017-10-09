export default function toBeLoggedAdd(food) {
	return {
		type: 'ADD_TO_TO_BE_LOGGED',
		payload: food
	}
}