import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Dashboard from "./components/admin/Dashboard";
import MissingResource from "./components/utilities/MissingResource";
import RequireAuth from "./components/utilities/RequireAuth";
import Unauthorized from "./components/utilities/Unauthorized";
import { useDispatch, useSelector } from "react-redux";

function App() {
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
