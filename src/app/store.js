import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/usersSlice";
import authReducer from "../features/auth/authSlice";

const store = configureStore({
	reducer: {
		users: userReducer,
		auth: authReducer,
	},
});

export default store;
