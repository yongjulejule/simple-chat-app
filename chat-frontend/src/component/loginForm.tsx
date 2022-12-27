import React from "react";

class LoginPage extends React.Component {
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
        email: event.target.email.value,
        password: event.target.password.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Login was successful, store the user's information and redirect to the main page
          localStorage.setItem("user", JSON.stringify(data.user));
          window.location.href = "/main";
        } else {
          // Login failed, display an error message
          alert(data.message);
          // this.setState({ error: data.message });
        }
      });
  };
  render() {
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
export default LoginPage;
