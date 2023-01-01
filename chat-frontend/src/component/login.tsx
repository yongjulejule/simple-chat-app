import { socket } from "./io";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const nav = useNavigate();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const res = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: email, password: password }),
      });
      if (res.status !== 200) {
        throw new Error("Login failed");
      }
      socket.emit("newConnection", email);
      nav("/");
    } catch (error) {
      alert(error);
    }
  };

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
