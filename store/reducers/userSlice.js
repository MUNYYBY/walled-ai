import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        userInfo: null,
    },
    reducers: {
        loginAction: (state, data) => {
            state.isLoggedIn = true;
            state.userInfo = data.payload;
        },
    },
});

export const { loginAction } = userSlice.actions;

export default userSlice.reducer;