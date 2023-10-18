import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import { USER_URL } from "../urls";

const Profile = () => {
	const { id } = useParams();
	const [userData, setUserData] = useState({});

	useEffect(() => {
		axios
			.get(`${USER_URL}/${id}`)
			.then((response) => {
				setUserData(response.data);
			})
			.catch((err) => {
				console.log(err.messge);
			});
	}, []);

	return (
		<section>
			<div id="display">
				<h1>Your profile</h1>
				<p>First Name: {userData.firstName}</p>
				<p>Last Name: {userData.lastName}</p>
				<p>Email: {userData.email}</p>
				<p>Password: {userData.password}</p>
			</div>
			<form id="edit-form">
				<label htmlFor="first-name">First Name</label>
				<input type="text" id="first-name" />
				<label htmlFor="last-name">Last Name</label>
				<input type="text" id="last-name" />
				<label htmlFor="password">Password</label>
				<input type="password" id="password" />
				<label htmlFor="confirm-password">Confirm Password</label>
				<input type="password" id="confirm=password" />
				<button type="submit">Update</button>
			</form>
		</section>
	);
};

export default Profile;
