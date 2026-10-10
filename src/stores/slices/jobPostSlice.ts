import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface JobPostState {
  // Step 1
  companyName: string;
  jobTitle: string;
  jobRole: string;
  jobType: string[];
  location: string;
  workMode: string[];
  minSalary: string;
  maxSalary: string;
  isNotDisclose: boolean;
  isNightShift: boolean;
  perks: string[];
  
  // Step 2
  qualification: string;
  minExperience: string;
  maxExperience: string;
  skills: string[];
  
  // Step 3
  jobDescription: string;
}

const initialState: JobPostState = {
  companyName: '',
  jobTitle: '',
  jobRole: '',
  jobType: ['Full-time'],
  location: '',
  workMode: ['Onsite'],
  minSalary: '',
  maxSalary: '',
  isNotDisclose: false,
  isNightShift: false,
  perks: ['Health Insurance'],
  qualification: '',
  minExperience: '',
  maxExperience: '',
  skills: [],
  jobDescription: '',
};

export const jobPostSlice = createSlice({
  name: 'jobPost',
  initialState,
  reducers: {
    updateJobPostData: (state, action: PayloadAction<Partial<JobPostState>>) => {
      return { ...state, ...action.payload };
    },
    resetJobPost: () => initialState,
  },
});

export const { updateJobPostData, resetJobPost } = jobPostSlice.actions;
export default jobPostSlice.reducer;
