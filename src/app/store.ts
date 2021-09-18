import {
  configureStore,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import todoSlice from '../features/todo/todoSlice';
import authSlice from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    todo: todoSlice,
    auth: authSlice,
  },
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
