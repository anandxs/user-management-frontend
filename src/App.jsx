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
import RequireNoAuth from "./components/utilities/RequireNoAuth";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />

				<Route element={<RequireNoAuth />}>
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
				</Route>

				<Route path="/unauthorized" element={<Unauthorized />} />

				<Route element={<RequireAuth allowedRoles={["user", "admin"]} />}>
					<Route path="/profile/:id" element={<Profile />} />
				</Route>

				<Route element={<RequireAuth allowedRoles={["admin"]} />}>
					<Route path="/dashboard" element={<Dashboard />} />
				</Route>

				<Route path="/*" element={<MissingResource />} />
			</Routes>
		</>
	);
}

export default App;
