export default function addOrRemoveFood(foodId){
	return {
		type    : "ADD_OR_REMOVE_FOOD",
		payload : foodId
	}
}