import { CookieOptions } from 'express';
import { IOptions } from 'sanitize-html';

export const API_PREFIX_v1 = "/api/v1";

export enum RESPONSE_STATUS {
  Success = 200,
  Bad_Request = 400,
  Internal_Error = 500,
  Unauthorized = 401,
}

export const GITHUB_ACCESS_TOKEN_URL =
  "https://github.com/login/oauth/access_token";
export const GITHUB_USER_EMAIL_URL = "https://api.github.com/user/emails";
export const GITHUB_GET_USER_URL = "https://api.github.com/user";
export const GITHUB_OAUTH_CLIENT_ID = "7e24771cb4cdedb85d94";

export const unguardedRoutes = [
  "/login",
  "/logout",
  "/restoreUserAccount",
  "/projects",
  "/comments/get_comments",
  "/download",
  "/solutions/get",
  "/mails/send-contact-email",
];

export const SANITIZATION_OPTIONS:IOptions = {
  allowedTags: [],
  allowedAttributes: {},
  disallowedTagsMode: 'escape'
}


export const COOKIE_CONFIG: CookieOptions = {
  path: '/',
  sameSite: "none",
  secure: true,
  maxAge: 24*60*60
}