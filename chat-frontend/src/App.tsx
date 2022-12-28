import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./component/login";
import Activity from "./component/Activity";

// app
const App = () => {
	// Activity();
	return (
		<BrowserRouter>
			<div>Hello world</div>
			<Routes>
				<Route path="/login" element={<Login />} />
				{/* <Route path="/" element={<LoginPage />} /> */}
				{/* <Route path="/" element={<LoginPage tab="home" />} />
				<Route path="/login" element={<LoginPage tab="login" />} />
				<Route path="/register" element={<LoginPage tab="register" />} /> */}
			</Routes>
			{
				window.localStorage.getItem('user') && <Activity />
			}
			{/* <Activity /> */}
			{/* <socketHandler /> */}
			{/* <Activity /> */}
			{/* <LoginPage /> */}
		</BrowserRouter >
	);
};

export default App;
