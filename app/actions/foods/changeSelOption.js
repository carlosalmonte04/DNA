export default function changeOption(food, selectedOptionId) {
	return {
		type: 'CHANGE_SELECTED_OPTION',
		payload: {food, selectedOptionId}
	}
}