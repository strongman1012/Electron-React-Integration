import { configureStore } from '@reduxjs/toolkit';
import employeesReducer from './slices/employeesSlice';
import configReducer from './slices/configSlice';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    employees: employeesReducer,
    config: configReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
