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
				macros.calorie      += (food.macros.calorie.value * food.portionSize)
				macros.protein      += (food.macros.protein.value * food.portionSize)
				macros.fat          += (food.macros.fat.value * food.portionSize)
				macros.carbohydrate += (food.macros.carbohydrate.value * food.portionSize)
			})
			return macros
		}

		micros() {
			let micros = {}

			this.foods.forEach(food => {
				for (key in food.micros) {
					console.log("VALUE:", parseInt(food.micros[key]['value']))
					micros[key] ? micros[key] = parseInt(food.micros[key]['value']) : micros[key] = micros[key] + (parseInt(food.micros[key]['value']))
					console.log("MICROS ON FIRST", micros)
				}
			})
			return micros
		}
	}
})()

export default Meal