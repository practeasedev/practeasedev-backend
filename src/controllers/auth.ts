import axios from "axios";
import { Request } from "express";
import {
  GITHUB_ACCESS_TOKEN_URL,
  GITHUB_OAUTH_CLIENT_ID,
  GITHUB_GET_USER_URL,
  GITHUB_USER_EMAIL_URL,
  RESPONSE_STATUS,
} from "../common/constants";
import { generateAPIResponse, getNameFromEmailId } from "../common/helper";
import {
  ICreateUser,
  createNewUser,
  deleteUser,
  getUserDataIfExists,
  restoreAccount,
  updateUserDetails,
} from "../services/auth";
import { createJWTToken } from "../services/jwttoken";
import {
  IControllerResponse,
  IRequestWithUserDetails,
  IServiceResponse,
} from "../common/types";

const getGithubAccessToken = async (
  req: Request
): Promise<{ accessToken: string; accessTokenError: boolean }> => {
  const { status, data } =
    (await axios.post(
      GITHUB_ACCESS_TOKEN_URL,
      {
        client_id: GITHUB_OAUTH_CLIENT_ID,
        client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
        code: req.body.code,
      },
      { headers: { Accept: "application/json" } }
    )) || {};
  const accessTokenError = status !== 200;

  return {
    accessToken: !accessTokenError ? data.access_token : null,
    accessTokenError,
  };
};

const getGithubUserEmail = async (
  accessToken: string
): Promise<{ userEmail: string; emailError: boolean }> => {
  let error = false;
  let primaryUserEmailData = "";

  const { status, data } =
    (await axios.get(GITHUB_USER_EMAIL_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })) || {};

  if (status !== 200 || !Array.isArray(data)) error = true;
  else primaryUserEmailData = data.find((emailData) => emailData.primary);

  return {
    userEmail: (primaryUserEmailData as any)?.email || null,
    emailError: error,
  };
};

const getGithubUserDetails = async (accessToken: string) => {
  const { status, data } =
    (await axios.get(GITHUB_GET_USER_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })) || {};
  const userDataError = status !== 200;
  return {
    userDataError,
    githubUserData: !userDataError ? data : null,
  };
};

const registerUser = async (userData: ICreateUser) => {
  const { success, data }: IServiceResponse = await createNewUser(userData);

  return {
    registerError: !success,
    newUserDetails: success ? data : null,
  };
};

export const loginUser = async (req: Request): Promise<IControllerResponse> => {
  try {
    const { accessToken, accessTokenError } = await getGithubAccessToken(req);
    if (accessTokenError) throw Error("Error fetching accessToken");

    const { githubUserData, userDataError } = await getGithubUserDetails(
      accessToken
    );
    if (userDataError) throw Error("Error fetching user data");

    const {
      id: github_id,
      avatar_url: github_avatar_url,
      name,
    } = githubUserData;

    //Using Github ID to get if the user is already registered
    const { success, data: userDetails } = await getUserDataIfExists(github_id);

    let userData = null;
    let isAccountDeleted = false;

    if (success) {
      const { _id, avatar_url, user_name, github_email, is_account_deleted } =
        userDetails as any;
      isAccountDeleted = !!is_account_deleted;

      if (
        !is_account_deleted &&
        (github_avatar_url !== avatar_url || name !== user_name)
      ) {
        //Up date User details in DB
        await updateUserDetails({
          github_id,
          name: name || getNameFromEmailId(github_email),
          avatarUrl: github_avatar_url,
        });
      }

      userData = {
        userId: _id,
        avatarUrl: avatar_url,
        userName: user_name,
        email: github_email,
      };
    } else {
      //Register
      const { userEmail, emailError } = await getGithubUserEmail(accessToken);
      if (emailError || !userEmail) throw Error("Error fetching email");

      const createUserPayload = {
        github_email: userEmail,
        user_name: name ?? getNameFromEmailId(userEmail),
        github_id,
        avatar_url: github_avatar_url,
        created_on: new Date(),
      };

      const { registerError, newUserDetails } = await registerUser(
        createUserPayload
      );
      if (registerError) throw Error("Error Creating User Record");

      userData = {
        userId: newUserDetails._id,
        avatarUrl: newUserDetails.avatar_url,
        userName: newUserDetails.user_name,
        email: newUserDetails.github_email,
      };
    }

    // If account not deleted we sent access token
    const userAccessToken = !isAccountDeleted ? createJWTToken(userData) : null;

    return {
      status: RESPONSE_STATUS.Success,
      response: {
        data: !isAccountDeleted
          ? { userAccessToken, isAccountDeleted: false }
          : { isAccountDeleted: true, email: userData.email },
        message: !isAccountDeleted
          ? "Successful login"
          : "User account linked to this github account has been deleted",
        success: true,
      },
    };
  } catch (error) {
    throw error;
  }
};

export const deleteUserFromDB = async (
  req: IRequestWithUserDetails
): Promise<IControllerResponse> => {
  try {
    const { reason } = req.body;
    const user = req.user;

    if (!reason || !user) {
      return {
        status: 400,
        response: generateAPIResponse({
          message: "Mandatory params are missing",
          data: {},
        }),
       
      };
    }
    const {status, message, data, success }: IServiceResponse = await deleteUser(user.userId, reason);
    

    return {
      status: status,
      response: generateAPIResponse({
        success: success,
        message: message,
        data: data,
      }),
    };
  } catch (error) {
    throw error;
  }
};

export const restoreUserAccount = async(req: Request): Promise<IControllerResponse> => {
  try{
    const { userEmail } = req.body;
    const { status, message, data, success }: IServiceResponse =
      await restoreAccount(userEmail);
      return {
        status: status,
        response: generateAPIResponse({
          success: success,
          message: message,
          data: data,
        }),
      };  
  }catch(error){
    throw error;
  }
}