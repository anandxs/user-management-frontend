import { createSlice } from "@reduxjs/toolkit";

const local = localStorage.getItem("key");

const initialState = {
	auth: local && JSON.parse(local),
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		onLogin: (state, action) => {
			state.auth = action.payload;
		},
		onLogout: (state) => {
			state.auth = null;
		},
	},
});

export const { onLogin, onLogout } = authSlice.actions;
export default authSlice.reducer;
