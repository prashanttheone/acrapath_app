import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface JobFilterState {
  page: number;
  limit: number;
  location: string;
  experience: string;
  salary: string;
  job_type: string;
  skills: string[];
  function: string;
}

const initialState: JobFilterState = {
  page: 1,
  limit: 10,
  location: '',
  experience: '',
  salary: '',
  job_type: '',
  skills: [],
  function: '',
};

export const jobFilterSlice = createSlice({
  name: 'jobFilter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<JobFilterState>>) => {
      return { ...state, ...action.payload, page: 1 }; // Reset to page 1 on filter change
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const { setFilter, setPage, resetFilters } = jobFilterSlice.actions;
export default jobFilterSlice.reducer;
