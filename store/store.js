import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers/userSlice';
import dashboardSlice from './reducers/dashboardSlice';


const store = configureStore({
    reducer: {
        user: userSlice,
        dashboard: dashboardSlice,
    },
});

export default store;
