const Profile = () => {
	return (
		<section>
			<div id="display">
				<h1>Your profile</h1>
				<p>First Name</p>
				<p>Last Name</p>
				<p>Email</p>
				<p>Password</p>
			</div>
			<form id="edit-form">
				<label htmlFor="first-name">First Name</label>
				<input type="text" id="first-name" />
				<label htmlFor="last-name">Last Name</label>
				<input type="text" id="last-name" />
				<label htmlFor="password">Password</label>
				<input type="password" id="password" />
				<label htmlFor="confirm-password">Confirm Password</label>
				<input type="password" id="confirm=password" />
				<button type="submit">Update</button>
			</form>
		</section>
	);
};

export default Profile;
