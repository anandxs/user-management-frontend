import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
	const auth = useSelector((state) => state.auth);
	const location = useLocation();

	useEffect(() => {
		console.log(auth);
	}, []);

	return allowedRoles?.includes(auth.role) ? (
		<Outlet />
	) : auth?.role !== "anon" ? (
		<Navigate to="/unauthorized" state={{ from: location }} replace={true} />
	) : (
		<Navigate to="/login" state={{ from: location }} replace={true} />
	);
};

export default RequireAuth;
