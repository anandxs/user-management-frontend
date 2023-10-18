import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
		<section>
			<h1>Home Page</h1>
			<Link to="/register">Link to register page</Link>
			<br />
			<Link to="/login">Link to login page</Link>
			<br />
			<br />
			<Link to={`/profile/${auth?.id}`}>Go to profile</Link>
			<br />
			<Link to="/dashboard">Link to admin dashboard</Link>
			<br />
			{auth && (
				<button type="button" onClick={handleLogout}>
					Logout
				</button>
			)}
		</section>
	);
};

export default Home;
