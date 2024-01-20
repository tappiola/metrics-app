import { jwtDecode } from "jwt-decode";

const ACCESS_TOKEN_KEY = "access_token";

export const setAuthToken = (token: string) => {
  return localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const getAuthToken = () => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);

  if (token) {
    const payload = jwtDecode(token);

    // Remove expired token from local storage to force new login
    if ((payload.exp || 0) < Date.now() / 1000) {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    }
  }

  return token;
};
