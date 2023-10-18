import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import { USER_URL } from "../../urls";

const Dashboard = () => {
	const [query, setQuery] = useState("");
	const [userList, setUserList] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();

		console.log(query);
		axios
			.get(`${USER_URL}/search?query=${query}`)
			.then((response) => {
				setUserList(response.data);
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	const handleDelete = (id) => {
		console.log(id);
		axios
			.delete(`${USER_URL}/${id}`)
			.then((response) => {
				console.log(response);
				handleFullList();
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	const handleFullList = () => {
		setQuery("");
		getAllUsers();
	};

	const getAllUsers = () => {
		axios
			.get(USER_URL)
			.then((response) => {
				setUserList(response.data);
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	useEffect(() => {
		getAllUsers();
	}, []);

	return (
		<section>
			<div className="admin-header">
				<h1>Users List</h1>
				<Link to="/create">Link to create new user</Link>
				<button type="button" onClick={handleFullList}>
					Get full list
				</button>
			</div>
			<form className="search-form" onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Search with email"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					required
				/>
				<button type="submit">Search</button>
			</form>
			<table>
				<thead>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{userList.map((user) => (
						<tr key={user.id}>
							<td>{user.firstName}</td>
							<td>{user.lastName}</td>
							<td>{user.email}</td>
							<td>
								{user.role !== "admin" && (
									<button type="button" onClick={() => handleDelete(user.id)}>
										Delete
									</button>
								)}
								<button type="button">
									<Link to={`/edit/${user.id}`}>Edit</Link>
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
};

export default Dashboard;
