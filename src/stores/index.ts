import { configureStore } from '@reduxjs/toolkit';
import jobPostReducer from './slices/jobPostSlice';
import jobFilterReducer from './slices/jobFilterSlice';

export const store = configureStore({
  reducer: {
    jobPost: jobPostReducer,
    jobFilter: jobFilterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
