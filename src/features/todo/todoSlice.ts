import {
  createAsyncThunk,
  createSelector,
  createSlice,
  AnyAction,
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import todoApi from '../../api/todoApi';
import { TodoI } from '../../types';

interface InitialStateI {
  requesting: boolean,
  success?: boolean,
  message?: string,
  list?: Array<TodoI> | null,
  todo_details?: TodoI | null,
}

const initialState: InitialStateI = {
  requesting: false,
  list: [],
  todo_details: null,
};

// ------------------------ACTIONS------------------------
export const getTodoList = createAsyncThunk(
  'todo/getTodoList',
  async () => {
    const res = await todoApi.getTodoList();
    return res;
  },
);

// ------------------------UTILITIES------------------------
const isPendingAction = (action: AnyAction) => action.type.endsWith('/pending') && action.type.includes('todo');
const isRejectedAction = (action: AnyAction) => action.type.endsWith('/rejected') && action.type.includes('todo');

// ------------------------SLICERS------------------------
const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodoList.fulfilled, (state, action: any) => {
        state.requesting = false;
        state.success = true;
        state.list = action.payload;
      })

      // utilities for  pending, rejected
      .addMatcher(isPendingAction, (state: any) => {
        state.requesting = true;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.requesting = false;
        state.success = false;
        state.message = action.error.message;
        // NotifyHelper.error(action.error.message, MessageStatus.ERROR)
      });
  },
});

// ------------------------SELECTORS------------------------
const selectTodo = (state: RootState) => state.todo;

export const selectTodoList = createSelector(
  [selectTodo],
  (state: any) => state.list,
);
export default todoSlice.reducer;
