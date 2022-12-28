import React, { useEffect, useRef, useState } from "react";
import { socket } from "./io";
// import { io } from "socket.io-client";


interface User {
	email: string;
}

interface UserBoxProps {
	// user: User;
	email: User['email'];
}

const UserBox = ({ email }: UserBoxProps) => {
	// const UserBox = (user: any) => {
	return (
		<div>
			{email}
		</div>
	)
}

const Activity = () => {
	const [activeUsers, setActiveUsers] = useState/* <User[]> */([])
	const socketRef = useRef(socket);

	useEffect(
		() => {

			console.log(activeUsers)
			socketRef.current.emit('userConnected', () => {
				return window.localStorage.getItem('user');
			});


			socketRef.current.on('clientHello', (data: any) => {
				// if (data && !activeUsers.includes(data))
				setActiveUsers(data);
			})

			// socketRef.current.on('connect', () => {
			/** server sends data currently logged on*/
			// })

			return () => {
				socket.off('clientHello');
				socket.off('userConnected');
			};
		},
		[activeUsers])

	const hi = [{ email: 'hi' }, { email: 'hi2' }]

	return (
		<>
			<div>{activeUsers}</div>
			<div>
				{/* {activeUsers.map((item) => <UserBox email={item.email} />)} */}
			</div>
			<div>
				{hi.map((item) => <UserBox email={item.email} />)}
			</div></>
	);
}


export default Activity;
