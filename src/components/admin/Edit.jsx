import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axios";
import { USER_URL } from "../../urls";

const Edit = () => {
	const { id } = useParams();
	const [userData, setUserData] = useState({});
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [error, setError] = useState();
	const [status, setStatus] = useState();

	const navigate = useNavigate();

	const goBack = () => navigate(-1);

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

	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.put(
				`${USER_URL}/${userData.id}`,
				JSON.stringify({ firstName, lastName, password: "" }),
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
			})
			.catch((err) => {
				setError(err.message);
			});
	};

	return (
		<section>
			<div id="display">
				<div>
					<h1>Profile Details</h1>
					<p>First Name: {userData.firstName}</p>
					<p>Last Name: {userData.lastName}</p>
					<p>Email: {userData.email}</p>
				</div>
				<div>
					<img src="" alt="profile-img" />
				</div>
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
				<button type="submit">Update</button>
				<button type="button" onClick={goBack}>
					Go Back
				</button>
			</form>
		</section>
	);
};

export default Edit;
