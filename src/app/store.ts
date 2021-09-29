import {
  configureStore,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import todoSlice from '../features/todo/todoSlice';
import authSlice from '../features/auth/authSlice';
import productSlice from '../features/marketplace/pages/productSlice';

export const store = configureStore({
  reducer: {
    todo: todoSlice,
    auth: authSlice,
    product: productSlice,
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
