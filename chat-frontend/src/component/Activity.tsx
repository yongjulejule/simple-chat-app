import React, { useEffect, useState } from "react";
import { socket } from "./io";

const Activity = () => {

	const [isConnected, setIsConnected] = useState(socket.connected);

	useEffect(() => {
		// socket.on('connect', () => {
		// 	setIsConnected(true);
		// 	socket.emit('userConnected', window.localStorage.getItem('user'))
		// });

		socket.on('disconnect', () => {
			setIsConnected(false);
		});


		return () => {
			socket.off('connect');
			socket.off('disconnect');
		};
	}, []);


	return (
		<div>
			<p>{isConnected && window.localStorage.getItem('user')}</p>
		</div>
	);
}


export default Activity;
