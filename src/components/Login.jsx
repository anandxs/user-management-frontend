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

	const goBack = () => navigate(-1);

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
				if (err.response.status == 404) setError("Invalid credentials");
				else setError(err.message);
			});
	};

	return (
		<section>
			<h1 className="text-center">Login</h1>
			<form className="login" onSubmit={handleSubmit}>
				{error !== "" ? <p className="text-danger">{error}</p> : null}
				<input
					type="email"
					id="email"
					placeholder="Enter email"
					className="form-control mb-2"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input
					type="password"
					id="password"
					placeholder="Enter password"
					className="form-control mb-2"
					value={password}
					onChange={(e) => setpassword(e.target.value)}
					required
				/>
				<button type="submit" className="btn btn-success">
					Login
				</button>
				<button
					type="button"
					onClick={goBack}
					className="btn btn-secondary mx-2"
				>
					Back
				</button>
			</form>
		</section>
	);
};

export default Login;
