import setLoading from './setLoading'
import pictureOnAnalyser from './pictureOnAnalyser'
import analyse from '../foods/analyse'

export default function startAnalyzer(picturePath) {
	return (dispatch) => {
		dispatch(setLoading(true))
		dispatch(pictureOnAnalyser(picturePath))
		dispatch(analyse(picturePath))
	}
}