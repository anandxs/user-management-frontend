import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireNoAuth = () => {
	const { auth } = useSelector((state) => state.auth);
	const location = useLocation();

	return auth?.role ? (
		<Navigate to="/" state={{ from: location }} replace={true} />
	) : (
		<Outlet />
	);
};

export default RequireNoAuth;
