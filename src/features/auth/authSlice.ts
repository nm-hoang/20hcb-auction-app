import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import authApi from '../../api/authApi';
import MessageStatus from '../../constants/message-status';
import { setAccessTokenToLocalStorage, setRoleToLocalStorage } from '../../helpers/auth';
import Notify from '../../helpers/notify';

interface InitialStateI {
  requesting: boolean,
  success?: boolean,
  message?: string | undefined,
  msg_SignUp: string,
  msg_LogIn: string,
}

const initialState: InitialStateI = {
  requesting: false,
  msg_LogIn: MessageStatus.IDLE,
  msg_SignUp: MessageStatus.IDLE,
};

// ------------------------ACTIONS------------------------
export const login = createAsyncThunk(
  'auth/login',
  async (data: object, { rejectWithValue }) => {
    try {
      const res = await authApi.login(data);
      return res;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);
export const signup = createAsyncThunk(
  'auth/signup',
  async (data: object, { rejectWithValue }) => {
    try {
      const res = await authApi.signup(data);
      return res;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

// ------------------------SLICERS------------------------
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSignUpMsgToDefault: (state) => {
      state.msg_SignUp = MessageStatus.IDLE;
    },
    setLogInMsgToDefault: (state) => {
      state.msg_LogIn = MessageStatus.IDLE;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.requesting = true;
        state.success = true;
        state.msg_LogIn = MessageStatus.PENDING;
      })
      .addCase(login.fulfilled, (state, action: any) => {
        state.requesting = false;
        state.success = true;
        state.msg_LogIn = MessageStatus.SUCCESS;
        console.log(action);
        setAccessTokenToLocalStorage(action.payload.data.accessToken);
        setRoleToLocalStorage(action.payload.data.role);
        Notify.success('Logged in successfully', MessageStatus.SUCCESS);
      })
      .addCase(login.rejected, (state, action: any) => {
        console.log(action);
        state.requesting = false;
        state.success = false;
        state.msg_LogIn = MessageStatus.ERROR;
        Notify.error(action.payload.message ? action.payload.message
          : action.error.message, MessageStatus.ERROR);
      })
      // Signup
      .addCase(signup.pending, (state) => {
        state.requesting = true;
        state.success = true;
        state.msg_SignUp = MessageStatus.PENDING;
      })
      .addCase(signup.fulfilled, (state, action: any) => {
        state.requesting = false;
        state.success = true;
        state.msg_SignUp = MessageStatus.SUCCESS;
        setAccessTokenToLocalStorage(action.payload.accessToken);
        Notify.success('Signed up successfully', MessageStatus.SUCCESS);
      })
      .addCase(signup.rejected, (state, action: any) => {
        state.requesting = false;
        state.success = false;
        state.msg_SignUp = MessageStatus.ERROR;
        Notify.error(action.payload.message ? action.payload.message
          : action.error.message, MessageStatus.ERROR);
      });
  },
});

// ------------------------SELECTORS------------------------
export const { setSignUpMsgToDefault, setLogInMsgToDefault } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export const selectRequesting = createSelector(
  [selectAuth],
  (state: any) => state.requesting,
);
export const selectLogInMessage = createSelector(
  [selectAuth],
  (state: any) => state.msg_LogIn,
);
export const selectSignUpMessage = createSelector(
  [selectAuth],
  (state: any) => state.msg_SignUp,
);

export default authSlice.reducer;
