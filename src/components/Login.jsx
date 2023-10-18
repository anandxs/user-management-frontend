import { useState } from "react";
import axios from "../api/axios";
import { LOGIN_URL } from "../urls";
import { useDispatch } from "react-redux";
import { onLogin } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setpassword] = useState("");
	const [error, setError] = useState("");

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const from = location.state?.from?.pathname || "/";

	const handleSubmit = (e) => {
		e.preventDefault();
		setError("");

		axios
			.post(LOGIN_URL, JSON.stringify({ email, password }), {
				headers: { "Content-Type": "application/json" },
				withCredentials: true,
			})
			.then((response) => {
				console.log(response.data);
				localStorage.setItem("key", JSON.stringify(response.data));
				dispatch(onLogin(response.data));
				navigate(from, { replace: true });
			})
			.catch((err) => {
				console.log(err.message);
				setError(err.message);
			});

		setEmail("");
		setpassword("");
	};

	return (
		<section>
			<form onSubmit={handleSubmit}>
				{error !== "" ? <p>{error}</p> : null}
				<label htmlFor="email">Enter email</label>
				<input
					type="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<label htmlFor="password">Enter password</label>
				<input
					type="password"
					id="password"
					value={password}
					onChange={(e) => setpassword(e.target.value)}
					required
				/>
				<button type="submit">Login</button>
			</form>
		</section>
	);
};

export default Login;
