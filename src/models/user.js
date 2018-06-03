// import firebase, { Auth } from "react-native-firebase";

export const User = (() => {
	let all = [];
	return class User {
		constructor(attributes) {
			for (key in attributes) {
				this[key] = attributes[key];
			}
			all.push(this);
		}

		static all() {
			return all;
		}

		static reset() {
			all = [];
		}

		getBmi() {
			const weight = parseInt(this.weight);
			const height = parseInt(this.height);
			return (weight / height / height * 703).toFixed(1);
		}

		getIbw() {
			const height = parseInt(this.height);
			switch (parseInt(this.gender)) {
				case 0:
					return Math.round((height - 60) * 6 + 106).toFixed(1);
				case 1:
					return Math.round((height - 60) * 5 + 105).toFixed(1);

				default:
					return "Invalid gender";
			}
		}

		getCaloricRequirement() {
			const weight = parseInt(this.weight);
			switch (this.goal) {
				case "Lose Weight":
					return Math.round(weight / 2.2 * 25);

				case "Maintain Weight":
					return Math.round(weight / 2.2 * 30);

				case "Gain Weight":
					return Math.round(weight / 2.2 * 35);

				default:
					return "Invalid goal";
			}
		}

		getProteinRequirement() {
			const weight = parseInt(this.weight);

			switch (this.goal) {
				case "Lose Weight":
					return Math.round(weight / 2.2 * 0.8);

				case "Maintain Weight":
					return Math.round(weight / 2.2 * 1);

				case "Gain Weight":
					return Math.round(weight / 2.2 * 1.2);

				default:
					return "Invalid goal";
			}
		}

		getFluidsRequirement() {
			const weight = parseInt(this.weight);
			return Math.round(weight / 2.2 * 30);
		}

		getFatRequirement() {
			return 40;
		}

		getCarbohydrateRequirement() {
			return 130;
		}
	};
})();
