const LOCAL_STORAGE_ACCESS_TOKEN = 'access_token';
const LOCAL_STORAGE_ROLE = 'role';

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
