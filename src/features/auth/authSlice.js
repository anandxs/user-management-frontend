import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	username: "",
	password: "",
	accessToken: "",
	role: "",
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
});

export default authSlice.reducer;
