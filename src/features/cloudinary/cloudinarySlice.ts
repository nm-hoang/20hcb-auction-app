import {
  createAsyncThunk,
  createSlice,
  AnyAction,
  createSelector,
} from '@reduxjs/toolkit';
import cloudinaryApi from '../../api/cloudinaryApi';
import { RootState } from '../../app/store';
import MessageStatus from '../../constants/message-status';
import Notify from '../../helpers/notify';
import { Image } from '../../types/imageType';
import { IState } from '../../types/stateType';

interface InitialStateI extends IState<Image> { }

const initialState: InitialStateI = {
  requesting: false,
  list: [],
};

export const uploadFile = createAsyncThunk(
  'cloudinary/uploadFile',
  async (file: any) => {
    const res = await cloudinaryApi.uploadFile(file);
    return res;
  },
);

const isPendingAction = (action: AnyAction) => action.type.endsWith('/pending') && action.type.includes('cloudinary');
const isRejectedAction = (action: AnyAction) => action.type.endsWith('/rejected') && action.type.includes('cloudinary');

const authSlice = createSlice({
  name: 'cloudinary',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.fulfilled, (state: InitialStateI, action: any) => {
        state.requesting = false;
        state.success = true;
        state.list = state.list!.concat(action.payload);
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

const cloudinaryState = (state: RootState) => state.cloudinary;

export const selectCloudinaryRequesting = createSelector(
  [cloudinaryState],
  (state: any) => state.requesting,
);
export const selectListImages = createSelector(
  [cloudinaryState],
  (state: any) => state.list,
);

export default authSlice.reducer;
