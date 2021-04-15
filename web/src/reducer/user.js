import {
    createSlice
} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null
    },
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
        deleteCurrentUser: (state) => {
            state.currentUser = null;
        },
    },
});

export const { setCurrentUser, deleteCurrentUser } = userSlice.actions;

export default userSlice.reducer;