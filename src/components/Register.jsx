import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { USER_URL } from "../urls";

const Register = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPwd, setConfirmPwd] = useState("");
	const [pwdErr, setPwdErr] = useState("");
	const [error, setError] = useState();
	const [status, setStatus] = useState();

	const navigate = useNavigate();

	const goBack = () => navigate(-1);

	useEffect(() => {
		if (password !== confirmPwd)
			setPwdErr("Password and confirmation password should match");
		else setPwdErr("");

		setError();
	}, [confirmPwd, email]);

	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.post(
				USER_URL,
				JSON.stringify({ firstName, lastName, email, password }),
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			)
			.then((response) => {
				console.log(response.data);
				if (localStorage.getItem("key")?.role === "user")
					setStatus("Go back and login to continue");
				else setStatus("Success");
				setEmail("");
				setPassword("");
				setConfirmPwd("");
				setFirstName("");
				setLastName("");
			})
			.catch((err) => {
				if (err.response.status == 400)
					setError(err.response.data.emailTaken[0]);
				else setError("Network error");
			});
	};

	return (
		<section>
			<h1 className="text-center">Create Account</h1>
			<form className="m-3 mx-0" onSubmit={handleSubmit}>
				{error && <p className="text-danger">{error}</p>}
				{status && <p className="text-success">{status}</p>}
				<div className="row mb-1">
					<div className="col-md-2">
						<label className="form-label" htmlFor="first-name">
							First Name
						</label>
					</div>
					<div className="col-md-10">
						<input
							type="text"
							id="first-name"
							className="form-control"
							placeholder="Enter first name"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							required
						/>
					</div>
				</div>
				<div className="row mb-1">
					<div className="col-md-2">
						<label className="fomr-label" htmlFor="last-name">
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
				<div className="row mb-1">
					<div className="col-md-2">
						<label className="form-label" htmlFor="email">
							Email
						</label>
					</div>
					<div className="col-md-10">
						<input
							type="email"
							id="email"
							className="form-control"
							placeholder="Enter your email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
				</div>
				<div className="row mb-1">
					<div className="col-md-2">
						<label className="form-label" htmlFor="password">
							Password
						</label>
					</div>
					<div className="col-md-10">
						<input
							type="password"
							id="password"
							placeholder="Enter password"
							className="form-control"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
				</div>
				<div className="row mb-1">
					<div className="col-12 text-danger">{pwdErr && <p>{pwdErr}</p>}</div>
					<div className="col-md-2">
						<label htmlFor="confirm-password">Confirm Password</label>
					</div>
					<div className="col-md-10">
						<input
							type="password"
							id="confirm-password"
							value={confirmPwd}
							className="form-control"
							placeholder="Enter password again"
							onChange={(e) => setConfirmPwd(e.target.value)}
							required
						/>
					</div>
				</div>
				<button className="btn btn-success" type="submit">
					Register
				</button>
				<button
					className="btn btn-secondary mx-1"
					type="button"
					onClick={goBack}
				>
					Go Back
				</button>
			</form>
		</section>
	);
};

export default Register;
