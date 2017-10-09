import makeTheChange from './makeTheChange'
import updateMacrosInMeal from '../meals/updateMacrosInMeal'

export default function changePortionSize(food, portionSize) {
	return (dispatch) => {
		dispatch(makeTheChange(food, portionSize))
		dispatch(updateMacrosInMeal())
	}
}