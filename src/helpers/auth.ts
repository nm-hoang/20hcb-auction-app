import { CurrentUser } from '../types/accountType';

const LOCAL_STORAGE_ACCESS_TOKEN = 'access_token';
const LOCAL_STORAGE_ROLE = 'role';
export const LOCAL_STORAGE_CURRENT_USER = 'current_user';

export const setAccessTokenToLocalStorage = (accessToken: string) => {
  localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, accessToken);
};

export const
  getAccessTokenFromLocalStorage = () => localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);

export const clearAccessTokenFromLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN);
};

export const setRoleToLocalStorage = (role: string) => {
  localStorage.setItem(LOCAL_STORAGE_ROLE, role);
};

export const
  getRoleFromLocalStorage = () => localStorage.getItem(LOCAL_STORAGE_ROLE);

export const clearRoleFromLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_ROLE);
};

export const checkAuth = () => {
  const token = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);

  return !!token;
};

export const setCurrentUserToLocalStorage = (
  currentUser: CurrentUser,
) => localStorage.setItem(LOCAL_STORAGE_CURRENT_USER, JSON.stringify(currentUser));

export const getCurrentUserFromLocalStorage = (
) => JSON.parse(localStorage.getItem(LOCAL_STORAGE_CURRENT_USER) as string);

export const getHeaders = () => {
  const accessToken = getAccessTokenFromLocalStorage();

  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};
