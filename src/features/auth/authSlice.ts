import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import authApi from '../../api/authApi';
import MessageStatus from '../../constants/message-status';
import { setAccessTokenToLocalStorage, setCurrentUserToLocalStorage, setRoleToLocalStorage } from '../../helpers/auth';
import Notify from '../../helpers/notify';
import { Account, CurrentUser } from '../../types/accountType';
import { ChangePasswordType } from '../../types/authType';

interface InitialStateI {
  requesting: boolean,
  success?: boolean,
  message?: string | undefined,
  msg_SignUp: string,
  msg_LogIn: string,
  currentUserDetails?: Account,
  error?: any
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

export const getMe = createAsyncThunk(
  'auth/getMe',
  async () => authApi.getMe(),
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (data: ChangePasswordType) => authApi.changePassword(data),
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

        const currentUser: CurrentUser = {
          uuid: action.payload.data.uuid,
          fullName: action.payload.data.fullName,
          username: action.payload.data.username,
          profilePicture: action.payload.data.profilePicture,
        };

        console.log(action);
        setAccessTokenToLocalStorage(action.payload.data.accessToken);
        setRoleToLocalStorage(action.payload.data.role);
        setCurrentUserToLocalStorage(currentUser);
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
      })
      .addCase(getMe.pending, (state: InitialStateI) => {
        state.requesting = true;
      })
      .addCase(getMe.fulfilled, (state: InitialStateI, action: any) => {
        state.requesting = false;
        state.currentUserDetails = action.payload;
      })
      .addCase(getMe.rejected, (state: InitialStateI) => {
        state.requesting = false;
        state.success = false;
      })
      .addCase(changePassword.pending, (state: InitialStateI) => {
        state.requesting = true;
      })
      .addCase(changePassword.fulfilled, (state: InitialStateI, action: any) => {
        state.requesting = false;
        state.success = true;
        if (action.payload) {
          state.error = action.payload;
        }
      })
      .addCase(changePassword.rejected, (state: InitialStateI, action: any) => {
        state.requesting = false;
        state.success = false;
        state.error = action.payload;
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

export const selectGetMe = createSelector(
  [selectAuth],
  (state: InitialStateI) => state.currentUserDetails,
);

export default authSlice.reducer;
