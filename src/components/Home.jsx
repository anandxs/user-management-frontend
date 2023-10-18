import { Link, Outlet } from "react-router-dom";

const Home = () => {
	return (
		<section>
			<h1>Home Page</h1>
			<Link to="/profile">Go to profile</Link>
			<br />
			<Link to="/register">Link to register page</Link>
			<br />
			<Link to="/login">Link to login page</Link>
			<br />
			<Link to="/dashboard">Link to admin dashboard</Link>
		</section>
	);
};

export default Home;
