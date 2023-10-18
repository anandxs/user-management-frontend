const Register = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<section>
			<form onSubmit={handleSubmit}>
				<label htmlFor="first-name">First Name</label>
				<input type="text" id="first-name" />
				<label htmlFor="last-name">Last Name</label>
				<input type="text" id="last-name" />
				<label htmlFor="email">Email</label>
				<input type="email" id="email" />
				<label htmlFor="password">Password</label>
				<input type="password" id="password" />
				<label htmlFor="confirm-password">Confirm Password</label>
				<input type="password" id="confirm-password" />
				<button type="submit">Register</button>
			</form>
		</section>
	);
};

export default Register;
