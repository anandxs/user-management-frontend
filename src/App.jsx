import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Dashboard from "./components/admin/Dashboard";
import MissingResource from "./components/MissingResource";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./components/Unauthorized";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onLogin } from "./features/auth/authSlice";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const localKey = localStorage.getItem("key");
		if (localKey) {
			const { email, accessToken, role } = localKey;
			dispatch(onLogin({ email, accessToken, role }));
		}
	}, []);

	return (
		<>
			<Routes>
				{/* anyone	 */}
				<Route path="/" element={<Home />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/unauthorized" element={<Unauthorized />} />

				{/* user only */}
				<Route element={<RequireAuth allowedRoles={["user", "admin"]} />}>
					<Route path="/profile/:id" element={<Profile />} />
				</Route>

				{/* admin only */}
				<Route element={<RequireAuth allowedRoles={["admin"]} />}>
					<Route path="/dashboard" element={<Dashboard />} />
				</Route>

				{/* missing */}
				<Route path="/*" element={<MissingResource />} />
			</Routes>
		</>
	);
}

export default App;
