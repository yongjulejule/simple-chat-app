import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./component/loginForm";

// app
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/" element={<LoginPage tab="home" />} />
				<Route path="/login" element={<LoginPage tab="login" />} />
				<Route path="/register" element={<LoginPage tab="register" />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
