import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./component/login";
import Activity from "./component/Activity";

// app
const App = () => {
	window.localStorage.debug = '*';
	// Activity();
	return (
		<BrowserRouter>
			<div>Hello world</div>
			<Routes>
				<Route path="/login" element={<Login />} />
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
