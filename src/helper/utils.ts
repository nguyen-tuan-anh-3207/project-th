/* eslint-disable */
import Cookies from "js-cookie";
import { REACT_APP_COOKIE_DOMAIN } from "src/constants/env";

// cookie
export const getCookieStorage = (key: string): any => Cookies.get(key);

export const setOneCookieStorage = (key: string, data: string | number | any): any => {
  const domain = REACT_APP_COOKIE_DOMAIN;
  Cookies.set(key, typeof data === 'object' ? JSON.stringify(data) : data, { domain });
};
