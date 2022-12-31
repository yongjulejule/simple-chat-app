import {socket} from "./io";
import {redirect} from "react-router-dom";

const Login = () => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    alert(email + " " + password);

    fetch("http://localhost:4000/auth/login", {
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
          socket.emit("newConnection", email);
          localStorage.setItem("user", JSON.stringify(data.user));
          alert(data.message);
          return redirect("/");
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
      <br />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" />
      <br />
      <button type="submit">Log in</button>
    </form>
  );
};

export default Login;
