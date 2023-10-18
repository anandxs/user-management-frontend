import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Dashboard from "./components/admin/Dashboard";
import MissingResource from "./components/MissingResource";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/dashboard" element={<Dashboard />} />

				<Route path="/*" element={<MissingResource />} />
			</Routes>
		</>
	);
}

export default App;
