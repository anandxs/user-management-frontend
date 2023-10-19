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

	useEffect(() => {
		setStatus("");
	}, [firstName, lastName]);

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
			<h1 className="text-center">Profile Details</h1>
			<div className="d-flex justify-content-between">
				<div>
					<p>First Name: {userData.firstName}</p>
					<p>Last Name: {userData.lastName}</p>
					<p>Email: {userData.email}</p>
				</div>
				{false && (
					<div>
						<img src="" alt="profile-img" />
					</div>
				)}
			</div>
			<form id="edit-form" onSubmit={handleSubmit}>
				<h5>Update Details</h5>
				{status && <p className="text-success">{status}</p>}
				<div className="row mb-1">
					<div className="col-md-2">
						<label className="form=label" htmlFor="first-name">
							First Name
						</label>
					</div>
					<div className="col-md-10">
						<input
							type="text"
							id="first-name"
							value={firstName}
							placeholder="Enter first name"
							className="form-control"
							onChange={(e) => setFirstName(e.target.value)}
							required
						/>
					</div>
				</div>
				<div className="row mb-1">
					<div className="col-md-2">
						<label className="form-label" htmlFor="last-name">
							Last Name
						</label>
					</div>
					<div className="col-md-10">
						<input
							type="text"
							id="last-name"
							className="form-control"
							placeholder="Enter last name"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							required
						/>
					</div>
				</div>
				<button type="submit" className="btn btn-success">
					Update
				</button>
				<button
					type="button"
					className="btn btn-secondary mx-2"
					onClick={goBack}
				>
					Go Back
				</button>
			</form>
		</section>
	);
};

export default Edit;
