export default function removeFood(food){
	return {
		type    : "REMOVE_FOOD_FROM_MEAL",
		payload : food
	}
}