import { useNavigate } from 'react-router';

const Register = () => {
  const nav = useNavigate();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const res = await fetch('http://localhost:4000/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.status !== 201) {
        throw new Error('Register failed');
      }
      nav('/login');
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
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
