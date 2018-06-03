export default function makeTheChange(food, portionSize) {
	return {
		type: 'CHANGE_PORTION_SIZE',
		payload: {food, portionSize}
	}
}