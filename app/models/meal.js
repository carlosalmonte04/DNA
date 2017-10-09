const Meal = ( () => {
	let all = []
	
	return class Meal {

		constructor(attributes) {

		  for (var key in attributes) {
		    this[key] = attributes[key];
		  }
		  if (!this.foods) this.foods = []
		}

		static reset() {
			all = []
		}

		static all() {
			return all
		}

		macros() {
			let macros = {
				calorie      : 0,
				protein      : 0,
				fat          : 0,
				carbohydrate : 0,
			}
			this.foods.forEach(food => {
				macros.calorie      = macros.calorie + (food.macros.calorie.value * food.portionSize)
				macros.protein      = macros.protein + (food.macros.protein.value * food.portionSize)
				macros.fat          = macros.fat + (food.macros.fat.value * food.portionSize)
				macros.carbohydrate = macros.carbohydrate + (food.macros.carbohydrate.value * food.portionSize)
			})
			return macros
		}
		micros() {
			let micros = {}

			this.foods.forEach(food => {
				for (key in food.micros) {
					null
				}
			})
		}
	}
})()

export default Meal