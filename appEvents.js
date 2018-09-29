export default {
	onLaunchApp: () => {
		console.log("App is started");
	},
	onUserLogin: () => {
		console.log("User logged into the app");
	},
	onUserSignup: () => {
		console.log("User is signed up to the site");
	},
	onResetPasword: () => {
		console.log("A user has changed his password");
	},
	onRequestPasswordResetToken: () => {
		console.log("A user has requested change of password");
	}
}