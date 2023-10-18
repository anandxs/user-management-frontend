import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { USER_URL } from "../../urls";

const Dashboard = () => {
	const [query, setQuery] = useState("");
	const [userList, setUserList] = useState([]);

	const navigate = useNavigate();

	const goBack = () => navigate(-1);

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
				<h1 className="text-center">Users List</h1>
				<Link to="/create">
					<button type="button" className="btn btn-primary">
						Create New User
					</button>
				</Link>
				<button
					type="button"
					className="btn btn-outline-secondary mx-2"
					onClick={handleFullList}
				>
					Get full list
				</button>
				<button onClick={goBack} type="button" className="btn btn-secondary">
					Go Back
				</button>
			</div>
			<form className="mt-3 mb-3" onSubmit={handleSubmit}>
				<div className="row">
					<div className="col-md-9">
						<input
							type="text"
							placeholder="Search with email"
							className="form-control"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							required
						/>
					</div>
					<div className="col-md-3">
						<button type="submit" className="btn btn-info w-100">
							Search
						</button>
					</div>
				</div>
			</form>
			<table className="table table-hover">
				<thead className="table-primary">
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
							<td className="d-flex justify-content-around gap-1">
								{user.role !== "admin" && (
									<button
										type="button"
										className="btn btn-danger w-100"
										onClick={() => handleDelete(user.id)}
									>
										Delete
									</button>
								)}
								<Link to={`/edit/${user.id}`} className="w-100">
									<button type="button" className="btn btn-warning w-100">
										Edit
									</button>
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
};

export default Dashboard;
