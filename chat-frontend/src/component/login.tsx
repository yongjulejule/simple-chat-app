import React, { useState } from "react";
import { socket } from "./io";

const Login = () => {
	// const [email, setEmail] = useState("");
	// const [password, setPassword] = useState("");

	const handleSubmit = (event: any) => {
		event.preventDefault();
		const email = event.target.email.value;
		const password = event.target.password.value;
		alert(email + " " + password);

		// Send a request to the backend to verify the login credentials
		fetch("http://localhost:4000/user", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email,
				password
			})
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					socket.emit('newConnection', email);
					// Login was successful, store the user's information and redirect to the main page
					localStorage.setItem("user", JSON.stringify(data.user));
					alert(data.message);
					window.location.href = "/";
					return;
				}
				alert(data.message);
			});
	};

	if (localStorage.getItem("user")) {
		return (
			<div>
				<p>You are already logged in.</p>
			</div>
		)
	}
	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="email">Email:</label>
			<input type="email" id="email" />
			<br />
			<label htmlFor="password">Password:</label>
			<input type="password" id="password" />
			<br />
			<button type="submit">Log in</button>
		</form>
	)
}

export default Login;
