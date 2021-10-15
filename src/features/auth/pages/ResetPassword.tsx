import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetPassword,
  selectResetPasswordMessage,
} from '../authSlice';
import MessageStatus from '../../../constants/message-status';

function ResetPassword(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();
  const msg_ResetPassword = useSelector(selectResetPasswordMessage);
  const url = useLocation<string>();
  let token: string | null;
  useEffect(() => {
    token = new URLSearchParams(url.search).get('token');
    dispatch(resetPassword(token!));
  }, [url]);

  useEffect(() => {
    if (msg_ResetPassword === MessageStatus.SUCCESS) {
      history.push(`/${token}`);
    }
  }, [msg_ResetPassword]);

  return (
    <></>
  );
}

export default ResetPassword;
