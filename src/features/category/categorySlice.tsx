import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { IState } from '../../types/stateType';
import categoryApi from '../../api/categoryApi';
import MessageStatus from '../../constants/message-status';
import Notify from '../../helpers/notify';
import { Category } from '../../types/productType';

interface ICategorySliceState extends IState<Category> {
}

const initialState: ICategorySliceState = {
  requesting: false,
  success: false,
  list: [],
};

export const getCategories = createAsyncThunk(
  'category/getCategories',
  async () => {
    const res = await categoryApi.getCategories();
    return res;
  },
);

const authSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.requesting = true;
      })
      .addCase(getCategories.fulfilled, (state, action: any) => {
        state.requesting = false;
        state.success = true;
        state.list = action.payload;
      })
      .addCase(getCategories.rejected, (state) => {
        state.requesting = false;
        state.success = false;
        Notify.error('Can not get list categories', MessageStatus.ERROR);
      });
  },
});

const categoryState = (state: RootState) => state.category;

export const selectListCategories = createSelector(
  [categoryState],
  (state: any) => state.list,
);

export default authSlice.reducer;
