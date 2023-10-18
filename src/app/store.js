import { createReducer } from "@reduxjs/toolkit";
import userReducer from "../features/usersSlice";

const store = createReducer({
	users: userReducer,
});

export default store;
