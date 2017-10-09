export default function addFood(food, foodInfo){
	return {
		type    : "ADD_FOOD_TO_MEAL",
		payload : {food, foodInfo}
	}
}