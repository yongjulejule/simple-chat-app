import React from "react"
import Login from "./login";

class Register extends React.Component {
	constructor(props: any) {
		super(props);
	}

	render() {
		return <>
			<Login>
			</Login>
			<button type="button"><a href='/register'>Register</a></button>
		</>
	}
}

export default Register;
