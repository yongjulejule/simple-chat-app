import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./component/login";
import Activity from "./component/Activity";
import Register from "./component/register";

const App = () => {
  return (

    <BrowserRouter>
      <Link to='/'> Home </Link>
      <Link to='/login'> Login</Link>
      <Link to='/register'> Register</Link>
      <Link to='/logout'> logout</Link>
      <hr/>
      <main>
      <Routes>
      {/* <Link to='/chat'> chat</Link> */}
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
       <Activity /> 
      </main>
    </BrowserRouter >
  );
};

export default App;
