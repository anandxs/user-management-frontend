import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import { USER_URL } from "../urls";
import { useSelector } from "react-redux";

const Profile = () => {
	const { id } = useParams();
	const [userData, setUserData] = useState({});
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPwd, setConfirmPwd] = useState("");
	const [pwdErr, setPwdErr] = useState("");
	const [error, setError] = useState();
	const [status, setStatus] = useState();

	const getUserData = () => {
		axios
			.get(`${USER_URL}/${id}`)
			.then((response) => {
				setUserData(response.data);
			})
			.catch((err) => {
				setError(err.message);
			});
	};

	useEffect(() => {
		getUserData();
	}, []);

	useEffect(() => {
		if (password !== confirmPwd)
			setPwdErr("Password and confirmation password should match");
		else setPwdErr();
	}, [confirmPwd]);

	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.put(
				`${USER_URL}/${userData.id}`,
				JSON.stringify({ firstName, lastName, password }),
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			)
			.then((response) => {
				setStatus("Successfully Updated");
				getUserData();
				setFirstName("");
				setLastName("");
				setPassword("");
				setConfirmPwd("");
			})
			.catch((err) => {
				setError(err.message);
			});
	};

	return (
		<section>
			<div id="display">
				<h1>Your profile</h1>
				<p>First Name: {userData.firstName}</p>
				<p>Last Name: {userData.lastName}</p>
				<p>Email: {userData.email}</p>
			</div>
			<form id="edit-form" onSubmit={handleSubmit}>
				{status && <p>{status}</p>}
				<label htmlFor="first-name">First Name</label>
				<input
					type="text"
					id="first-name"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					required
				/>
				<br />
				<label htmlFor="last-name">Last Name</label>
				<input
					type="text"
					id="last-name"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					required
				/>
				<br />
				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<br />
				{pwdErr && <p>{pwdErr}</p>}
				<label htmlFor="confirm-password">Confirm Password</label>
				<input
					type="password"
					id="confirm=password"
					value={confirmPwd}
					onChange={(e) => setConfirmPwd(e.target.value)}
					required
				/>
				<br />
				<button type="submit">Update</button>
			</form>
		</section>
	);
};

export default Profile;
