import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	email: localStorage.getItem("key")?.email ?? "",
	accessToken: localStorage.getItem("key")?.accessToken ?? "",
	role: localStorage.getItem("key")?.role ?? "anon",
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		onLogin: (state, action) => {
			state.email = action.payload.email;
			state.accessToken = action.payload.accessToken;
			state.role = action.payload.role;
		},
		onLogout: (state) => {
			state.email = "";
			state.accessToken = "";
			state.role = "anon";
		},
		onReload: (state, action) => {
			state.email = action.payload.email;
			state.accessToken = action.payload.accessToken;
			state.role = action.payload.accessToken;
		},
	},
});

export const { onLogin, onLogout } = authSlice.actions;
export default authSlice.reducer;
