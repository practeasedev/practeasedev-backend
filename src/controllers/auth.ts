import axios from "axios";
import { Request } from "express";
import {
  GITHUB_ACCESS_TOKEN_URL,
  GITHUB_OAUTH_CLIENT_ID,
  GITHUB_GET_USER_URL,
  GITHUB_USER_EMAIL_URL,
} from "../common/constants";
import { generateAPIResponse } from "../common/helper";
import { createNewUser, getUserDataIfExists } from "../services/auth";
import { createJWTToken } from "../services/jwttoken";

export const registerUser = async (req: Request) => {
  try {
    const accessTokenResult = await axios.post(
      GITHUB_ACCESS_TOKEN_URL,
      {
        client_id: GITHUB_OAUTH_CLIENT_ID,
        client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
        code: req.body.code,
      },
      {
        headers: { Accept: "application/json" },
      }
    );

    if (accessTokenResult.status !== 200) {
      return {
        status: 400,
        response: generateAPIResponse({ message: "Something went wrong" }),
      };
    }

    const accessToken = accessTokenResult.data.access_token;

    const userEmailsResult = await axios.get(GITHUB_USER_EMAIL_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (
      userEmailsResult.status !== 200 ||
      !Array.isArray(userEmailsResult.data)
    ) {
      return {
        status: 400,
        response: generateAPIResponse({ message: "Something went wrong" }),
      };
    }

    const primaryUserEmailData = userEmailsResult.data.find(
      (emailData) => emailData.primary
    );

    if (!primaryUserEmailData) {
      return {
        status: 400,
        response: generateAPIResponse({ message: "Something went wrong" }),
      };
    }

    const userDataResult = await getUserDataIfExists(
      primaryUserEmailData.email
    );

    let userData: any;

    if (!userDataResult.success) {
      const userGithubDataResult = await axios.get(GITHUB_GET_USER_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (userGithubDataResult.status !== 200) {
        return {
          status: 400,
          response: generateAPIResponse({ message: "Something went wrong" }),
        };
      }

      const { avatar_url: avatarUrl, name } = userGithubDataResult.data;

      const newUserDataResult = await createNewUser(
        primaryUserEmailData.email,
        avatarUrl,
        name
      );

      const { _id, avatar_url, github_id } = newUserDataResult.data as any;

      userData = {
        userId: _id,
        avatarUrl: avatar_url,
        userName: github_id,
        email: primaryUserEmailData.email,
      };
    } else {
      const { _id, avatar_url, github_id } = userDataResult.data as any;
      userData = {
        userId: _id,
        avatarUrl: avatar_url,
        userName: github_id,
        email: primaryUserEmailData.email,
      };
    }

    const userAccessToken = createJWTToken(userData);
    // const userAccessToken = createJWTToken({
    //   userName: "Test User0",
    //   userId: "644427053a1450db9ee14f85",
    // });

    return {
      status: 200,
      response: generateAPIResponse({
        message: "successfully created user",
        data: userAccessToken,
        success: true,
      }),
    };
  } catch (error) {
    throw error;
  }
};
