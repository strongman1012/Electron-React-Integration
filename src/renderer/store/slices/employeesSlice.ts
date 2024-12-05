import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EmployeesState {
  timelive: any;
  quickbooks: any;
}

const initialState: EmployeesState = {
  timelive: [],
  quickbooks: [],
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setTimeLive(state, action: PayloadAction<any>) {
      state.timelive = action.payload;
    },
    setQuickBooks(state, action: PayloadAction<any>) {
      state.quickbooks = action.payload;
    },
  },
});

export const { setTimeLive, setQuickBooks } = employeesSlice.actions;
export default employeesSlice.reducer;
