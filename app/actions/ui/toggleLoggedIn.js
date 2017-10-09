export default function toggleLoggedIn(bool) {
	return {
		type: "TOGGLE_LOGGED_IN",
		payload: bool
	}
}