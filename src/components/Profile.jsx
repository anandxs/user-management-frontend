import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";
import { USER_URL } from "../urls";

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
			<h1 className="text-center mb-3">Your profile</h1>
			<div className="d-flex justify-content-between" id="display">
				<div>
					<p>First Name: {userData?.firstName}</p>
					<p>Last Name: {userData?.lastName}</p>
					<p>Email: {userData?.email}</p>
				</div>
				{false && (
					<div>
						<img src="" alt="profile-img" />
					</div>
				)}
			</div>
			<form className="mt-3" id="edit-form" onSubmit={handleSubmit}>
				{status && <p className="text-success form-text">{status}</p>}
				<h4>Update Profile</h4>
				<div className="row">
					<div className="col-md-2">
						<label htmlFor="first-name" className="form-label">
							First Name
						</label>
					</div>
					<div className="col-md-10">
						<input
							type="text"
							id="first-name"
							className="form-control"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							required
						/>
					</div>
				</div>
				<div className="row">
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
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							required
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-md-2">
						<label className="form-label" htmlFor="password">
							Password
						</label>
					</div>
					<div className="col-md-10">
						<input
							type="password"
							id="password"
							className="form-control"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<p className="text-danger">{pwdErr}</p>
					</div>
					<div className="col-md-2">
						<label className="form-label" htmlFor="confirm-password">
							Confirm Password
						</label>
					</div>
					<div className="col-md-10">
						<input
							type="password"
							id="confirm=password"
							className="form-control"
							value={confirmPwd}
							onChange={(e) => setConfirmPwd(e.target.value)}
							required
						/>
					</div>
				</div>
				<button className="btn btn-success" type="submit">
					Update
				</button>
				<button
					type="button"
					onClick={goBack}
					className="mx-1 btn btn-secondary"
				>
					Go Back
				</button>
			</form>
		</section>
	);
};

export default Profile;
