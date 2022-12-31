import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./component/login";
import Activity from "./component/Activity";
import Register from "./component/register";

const App = () => {
  return (
    <BrowserRouter>
      <div>Hello world</div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      {
        window.localStorage.getItem('user') && <Activity />
      }
    </BrowserRouter >
  );
};

export default App;
