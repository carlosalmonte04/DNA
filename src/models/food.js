const Food = ( () => {
	let all = []
	let stageThree = []
	
	return class Food {

		constructor(attributes) {
		  for (var key in attributes) {
		    this[key] = attributes[key];
		  }
		}

		static all() {
			return all
		}

		static find(foodId) {
			return all.find(food => food.id === foodId)
		}

		static reset() {
			all = []
			stageThree = []
		}

		save() {
		  all.push(this)
		}

		addAttributes(attributes) {
		  for (var key in attributes) {
		    this[key] = attributes[key];
		  }
		}

		changeSelOption(selectedOptionId) {
			this.options.forEach(option => option.selected = false)
			const selectedOption = this.options.find(option => selectedOptionId === option.ndbno)
			selectedOption.selected = true
		}

		selectedOption() {
			const selectedOption = this.options.find(option => option.selected)
			return selectedOption
		}

		updateMacros(action, macros) {
			switch(action.toLowerCase()){
				case 'add':
					this.macros = {
						calorie      : this.macros.calorie + macros.calorie,
						protein      : this.macros.protein + macros.protein,
						fat          : this.macros.fat + macros.fat,
						carbohydrate : this.carbohydrate.calorie + carbohydrate.calorie,
					}
					break
				case 'remove':
					this.macros = {
						calorie      : this.macros.calorie - macros.calorie,
						protein      : this.macros.protein - macros.protein,
						fat          : this.macros.fat - macros.fat,
						carbohydrate : this.carbohydrate.calorie - carbohydrate.calorie,
					}
					break

				default:
					return 'action (first argument passed) not valid'
					break
			}
		}
	}
})()

export default Food