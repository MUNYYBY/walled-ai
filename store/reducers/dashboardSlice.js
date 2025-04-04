import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        apiUsageData: {},
    },
    reducers: {
        addApiUsageData: (state, action) => {
            console.log("action.payload", action);
            state.apiUsageData = action.payload;
        },
    },
});

export const { addApiUsageData } = dashboardSlice.actions;

export default dashboardSlice.reducer;