import React from "react"
import Login from "./login";

const Register = () => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    alert(email + " " + password);
    
    fetch("http://localhost:4000/api/user", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          return <Login />;
        }
        alert(data.message);
      });
  };
  
  if (localStorage.getItem("user")) {
    return (
      <div>
        <p>You are already logged in.</p>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" />
      <button type="submit">Register</button>
    </form>
  );
};




export default Register;
