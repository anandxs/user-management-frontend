const UserList = () => {
	return (
		<div>
			<h1>List of users with options</h1>
			<form>
				<input type="text" placeholder="Search with email" />
				<button type="button">Search</button>
			</form>
			<ul>
				<li>
					<div>
						<p>link to edit user profile</p>
						<button type="button">button to delete user</button>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default UserList;
