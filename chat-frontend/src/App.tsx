import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./component/login";
import SocketHandler from "./component/socket";

// app
const App = () => {
	// SocketHandler();
	return (
		<BrowserRouter>
			<div>Hello world</div>
			<Routes>
				<Route path='/socket' element={<SocketHandler />} />
				<Route path="/login" element={<Login />} />
				{/* <Route path="/" element={<LoginPage />} /> */}
				{/* <Route path="/" element={<LoginPage tab="home" />} />
				<Route path="/login" element={<LoginPage tab="login" />} />
				<Route path="/register" element={<LoginPage tab="register" />} /> */}
			</Routes>
			{/* <socketHandler /> */}
			{/* <Activity /> */}
			{/* <LoginPage /> */}
		</BrowserRouter >
	);
};

export default App;
