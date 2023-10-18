const Login = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<section>
			<form onSubmit={handleSubmit}>
				<label htmlFor="email">Enter email</label>
				<input type="email" id="email" />
				<label htmlFor="password">Enter password</label>
				<input type="password" id="password" />
				<button type="submit">Login</button>
			</form>
		</section>
	);
};

export default Login;
