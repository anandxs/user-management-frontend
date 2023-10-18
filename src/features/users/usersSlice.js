import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loading: false,
	users: [],
	error: "",
};

const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
});

// export const {} = userSlice.actions;
export default userSlice.reducer;
