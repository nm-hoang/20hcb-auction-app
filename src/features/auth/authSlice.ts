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
import { CurrentUser } from '../../types/accountType';

interface InitialStateI {
  requesting: boolean,
  success?: boolean,
  message?: string | undefined,
  msg_SignUp: string,
  msg_LogIn: string,
  msg_ResetPassword: string,
  msg_RecoveryPassword: string,
}

const initialState: InitialStateI = {
  requesting: false,
  msg_LogIn: MessageStatus.IDLE,
  msg_SignUp: MessageStatus.IDLE,
  msg_ResetPassword: MessageStatus.IDLE,
  msg_RecoveryPassword: MessageStatus.IDLE,
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

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (token: string) => authApi.resetPassword(token),
);

export const recoveryPassword = createAsyncThunk(
  'auth/recoveryPassword',
  async (email: string) => {
    const res = await authApi.recoveryPassword(email);
    return res;
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
        setAccessTokenToLocalStorage(action.payload.data.accessToken);
        setRoleToLocalStorage(action.payload.data.role);
        setCurrentUserToLocalStorage(currentUser);
        Notify.success('Logged in successfully', MessageStatus.SUCCESS);
      })
      .addCase(login.rejected, (state, action: any) => {
        state.requesting = false;
        state.success = false;
        state.msg_LogIn = MessageStatus.ERROR;
        Notify.error('Log in failure', MessageStatus.ERROR);
      })
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
        state.message = action.payload;
        Notify.error('Sign up failure', MessageStatus.ERROR);
      })
      .addCase(resetPassword.pending, (state) => {
        state.requesting = true;
        state.success = true;
        state.msg_ResetPassword = MessageStatus.PENDING;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.requesting = false;
        state.success = true;
        state.msg_ResetPassword = MessageStatus.SUCCESS;
      })
      .addCase(resetPassword.rejected, (state, action: any) => {
        state.requesting = false;
        state.success = false;
        state.message = action.payload;
        state.msg_ResetPassword = MessageStatus.ERROR;
        Notify.error('Reset password failure', MessageStatus.ERROR);
      })
      .addCase(recoveryPassword.pending, (state) => {
        state.requesting = true;
        state.success = true;
        state.msg_RecoveryPassword = MessageStatus.PENDING;
      })
      .addCase(recoveryPassword.fulfilled, (state) => {
        state.requesting = false;
        state.success = true;
        state.msg_RecoveryPassword = MessageStatus.SUCCESS;
      })
      .addCase(recoveryPassword.rejected, (state, action: any) => {
        state.requesting = false;
        state.success = false;
        state.message = action.payload;
        state.msg_RecoveryPassword = MessageStatus.ERROR;
        Notify.error('Reset password failure', MessageStatus.ERROR);
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
export const selectResetPasswordMessage = createSelector(
  [selectAuth],
  (state: any) => state.msg_ResetPassword,
);
export const selectRecoveryPasswordMessage = createSelector(
  [selectAuth],
  (state: any) => state.msg_RecoveryPassword,
);
export default authSlice.reducer;
