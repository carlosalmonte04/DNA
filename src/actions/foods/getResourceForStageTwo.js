import { USDA_KEY } from 'react-native-dotenv'

export default function getResourceForStageTwo(food, foodName) {
	const apiUrl = `https://api.nal.usda.gov/ndb/search/?format=json&q=${foodName}&sort=r&max=50&api_key=${USDA_KEY}`
  return (dispatch) => {
  	if (foodName != undefined) {
			return fetch(apiUrl)
			.then(res => res.json())
			.then(usdaOptions=> {
					return usdaOptions.list.item
			})
      .catch(error => console.log(`Got the following error while getting resources for stage two while searching for -> ${foodName}`, error))
		}
  }
}