export default function newMeal(attributes) {
	return {
		type: 'NEW_MEAL',
		payload: attributes
	}
}