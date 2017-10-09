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

		save() {
		  all.push(this)
		}

		static reset() {
			all = []
			stageThree = []
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