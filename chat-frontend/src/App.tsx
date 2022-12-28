import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./component/login";
import Activity from "./component/Activity";

const App = () => {
  return (
    <BrowserRouter>
      <div>Hello world</div>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      {
        window.localStorage.getItem('user') && <Activity />
      }
    </BrowserRouter >
  );
};

export default App;
