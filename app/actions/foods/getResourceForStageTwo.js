export default function getResourceForStageTwo(food, foodName) {
	const apiUrl = `https://api.nal.usda.gov/ndb/search/?format=json&q=${foodName}&sort=r&max=50&api_key=a0BDOE70I6xrdLQTVCy1x7xcm3F4N5H2JimATwJn`
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