import { User } from "@dnaModels";

const Meal = (() => {
	let all = [];

	return class Meal {
		constructor(attributes) {
			for (var key in attributes) {
				this[key] = attributes[key];
			}
			if (!this.foods) this.foods = [];
		}

		static reset() {
			all = [];
		}

		static all() {
			return all;
		}

		static getAllUserMeals() {
			/*
				make API call to return all meals
			*/
		}

		macros() {
			let macros = {
				calorie: 0,
				protein: 0,
				fat: 0,
				carbohydrate: 0
			};
			this.foods.forEach(food => {
				macros.calorie += food.macros.calorie.value * food.portionSize;
				macros.protein += food.macros.protein.value * food.portionSize;
				macros.fat += food.macros.fat.value * food.portionSize;
				macros.carbohydrate +=
					food.macros.carbohydrate.value * food.portionSize;
			});
			return macros;
		}

		micros() {
			let micros = {};

			this.foods.forEach(food => {
				for (let key in food.micros) {
					if (micros[key]) {
						micros[key]["value"] +=
							food.micros[key]["value"] * food.portionSize;
					} else {
						micros[key] = Object.assign({}, food.micros[key]);
					}
				}
			});
			return micros;
		}

		save() {
			/*
			save on user db and async storage
		*/
		}

		delete() {
			/*
			permanently delete from db and async storage
		*/
		}

		edit(newMealInfo) {
			/*
			make PUT call to edit the info
		*/
		}
	};
})();

export default Meal;
