import { RESPONSE_STATUS } from "../common/constants";
import { IServiceResponse } from "../common/types";
import User from "../models/user.model";

export interface ICreateUser {
  github_email: string;
  user_name: any;
  github_id: any;
  avatar_url: any;
  created_on: Date;
}

export const getUserDataIfExists = async (id: number) => {
  try {
    const userData = await User.findOne(
      { github_id: id },
      {
        _id: 1,
        avatar_url: 1,
        user_name: 1,
        github_email: 1,
        is_account_deleted: 1,
      }
    );

    if (!userData) {
      return {
        status: RESPONSE_STATUS.Bad_Request,
        success: false,
        message: "No user with the given email id exists",
        data: {},
      };
    }

    return {
      status: RESPONSE_STATUS.Success,
      success: true,
      message: "User exists with the given data",
      data: userData,
    };
  } catch (error) {
    throw error;
  }
};

export const createNewUser = async ({
  github_email,
  github_id,
  user_name,
  avatar_url,
  created_on,
}: ICreateUser): Promise<IServiceResponse> => {
  try {
    const newUser = await User.create([
      {
        user_name,
        github_email,
        github_id,
        avatar_url,
        created_on,
        completed_projects: 0,
        is_account_deleted: false,
      },
    ]);

    return {
      status: RESPONSE_STATUS.Success,
      success: true,
      message: "Successfully created user",
      data: newUser[0]._doc,
    };
  } catch (error) {
    throw error;
  }
};

export const updateUserDetails = async ({ github_id, name, avatarUrl }) => {
  try {
    await User.updateOne(
      { github_id: github_id },
      { $set: { user_name: name, avatar_url: avatarUrl } }
    );
    return {
      status: RESPONSE_STATUS.Success,
      success: true,
      message: "Successfully created user",
    };
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId: string, reason:string) => {
  try {
    const deletedUser = await User.updateOne(
      {
        _id: userId,
      },
      {
        is_account_deleted: true,
        reason_for_delete: reason
      }
    );

    return {
      status: deleteUser
        ? RESPONSE_STATUS.Success
        : RESPONSE_STATUS.Bad_Request,
      success: deletedUser ? true : false,
      message: deletedUser ? "Successfully deleted the user" : "User not found",
      data: {},
    };
  } catch (error) {
    throw error;
  }
};

export const restoreAccount = async (
  email: string
): Promise<IServiceResponse> => {
  try {
    const restoredUser = await User.updateOne(
      { github_email: email },
      { is_account_deleted: false }
    );

    return {
      status: restoredUser
        ? RESPONSE_STATUS.Success
        : RESPONSE_STATUS.Bad_Request,
      success: restoredUser ? true : false,
      message: restoredUser ? "Successfully restored the user" : "User not found",
      data: {},
    };
  } catch (error) {
    throw error;
  }
};
