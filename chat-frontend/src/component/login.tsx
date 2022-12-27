import React from "react";
import io from "socket.io-client";


const socket = io("http://localhost:4000");
class Login extends React.Component {
	constructor(props: any) {
		super(props);
		this.state = { email: "", password: "", error: "" };
	}

	handleSubmit = (event: any) => {
		event.preventDefault();

		// Send a request to the backend to verify the login credentials
		fetch("http://localhost:4000/user", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				"email": event.target.email.value,
				"password": event.target.password.value
			})
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					socket.on('connect', () => { console.log("Connected to socket.io server") });
					// Login was successful, store the user's information and redirect to the main page
					localStorage.setItem("user", JSON.stringify(data.user));
					alert(data.message);
					window.location.href = "/";
				}
				alert(data.message);
			});
	};
	render() {
		if (localStorage.getItem("user")) {
			window.location.href = "/";
			return;
		}
		return (
			<form onSubmit={this.handleSubmit}>
				<label htmlFor="email">Email:</label>
				<input type="email" id="email" />
				<br />
				<label htmlFor="password">Password:</label>
				<input type="password" id="password" />
				<br />
				<button type="submit">Log in</button>
			</form>
		);
	}
}
export default Login;
