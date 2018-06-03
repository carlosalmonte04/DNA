export default function toggleSignUpFormCompleted(bool) {
	return {
		type: "TOGGLE_SIGN_UP_FORM_COMPLETED",
		payload: bool
	}
}