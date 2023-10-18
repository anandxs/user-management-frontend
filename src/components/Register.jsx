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
				setStatus("Go back and login to continue");
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
			<form onSubmit={handleSubmit}>
				{error && <p>{error}</p>}
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
				<label htmlFor="email">Email</label>
				<input
					type="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
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
				{pwdErr && <p>{pwdErr}</p>}
				<br />
				<label htmlFor="confirm-password">Confirm Password</label>
				<input
					type="password"
					id="confirm-password"
					value={confirmPwd}
					onChange={(e) => setConfirmPwd(e.target.value)}
					required
				/>
				<button type="submit">Register</button>
				<button type="button" onClick={goBack}>
					Go Back
				</button>
			</form>
		</section>
	);
};

export default Register;
