export default function changeOptions(food, newOptions) {
	return {
		type: 'CHANGE_OPTIONS',
		payload: {food, newOptions}
	}
}