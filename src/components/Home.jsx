import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { onLogout } from "../features/auth/authSlice";

const Home = () => {
	const { auth } = useSelector((state) => state.auth);

	useEffect(() => {
		console.log(auth);
	}, [auth]);

	const dispatch = useDispatch();

	const handleLogout = () => {
		localStorage.clear();
		dispatch(onLogout());
		console.log("logging out");
	};

	return (
		<section className="home">
			<h1>Home Page</h1>
			<div className="d-flex flex-column gap-1">
				{!auth && (
					<>
						<Link to="/register">
							<button className="btn btn-info w-100" type="button">
								Register
							</button>
						</Link>
						<Link to="/login">
							<button className="btn btn-info w-100" type="button">
								Login
							</button>
						</Link>
					</>
				)}
				{auth && (
					<Link to={`/profile/${auth?.id}`}>
						<button className="btn btn-info w-100" type="button">
							Go to profile
						</button>
					</Link>
				)}
				{auth && (
					<Link to="/dashboard">
						<button className="btn btn-info w-100" type="button">
							Admin Dashboard
						</button>
					</Link>
				)}
				{auth && (
					<button
						className="btn btn-danger"
						type="button"
						onClick={handleLogout}
					>
						Logout
					</button>
				)}
			</div>
		</section>
	);
};

export default Home;
