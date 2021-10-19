import {
  createAsyncThunk,
  createSlice,
  AnyAction,
} from '@reduxjs/toolkit';
import cloudinaryApi from '../../api/cloudinaryApi';
import MessageStatus from '../../constants/message-status';
import Notify from '../../helpers/notify';
import { Image } from '../../types/imageType';
import { IState } from '../../types/stateType';

interface InitialStateI extends IState<Image> { }

const initialState: InitialStateI = {
  requesting: false,
};

export const uploadFile = createAsyncThunk(
  'cloundinary/uploadFile',
  async (file: any) => {
    console.log(file);
    const res = await cloudinaryApi.uploadFile(file);
    return res;
  },
);

const isPendingAction = (action: AnyAction) => action.type.endsWith('/pending') && action.type.includes('cloudinay');
const isRejectedAction = (action: AnyAction) => action.type.endsWith('/rejected') && action.type.includes('cloudinay');

const authSlice = createSlice({
  name: 'cloudinary',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.requesting = false;
        state.success = true;
        console.log(action);
      })
      .addMatcher(isPendingAction, (state) => {
        state.requesting = true;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.requesting = false;
        state.success = false;
        state.error = action.error.message;
        Notify.error(action.error.message, MessageStatus.ERROR);
      });
  },
});

export default authSlice.reducer;
