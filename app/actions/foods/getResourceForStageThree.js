import setInStageThree from './setInStageThree'
import setLoading from '../ui/setLoading'
export default function getAnalysis(food, usdaNdbno) {

	const apiUrl = `https://api.nal.usda.gov/ndb/V2/reports?ndbno=${usdaNdbno}&type=f&format=json&api_key=a0BDOE70I6xrdLQTVCy1x7xcm3F4N5H2JimATwJn`
  return (dispatch) => {
  	if (usdaNdbno != undefined) {
			return fetch(apiUrl)
			.then(res => {
				return res.json()
			})
			.then(foodAnalysis => {
				const analysis = foodAnalysis.foods[0].food
					return analysis
			})
			.catch((err) => {
	    console.log("Error getting options from USDA", err)
	  	})
		}
  }
}
