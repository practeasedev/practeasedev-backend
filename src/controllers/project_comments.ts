import {
  IControllerResponse,
  IRequestWithUserDetails,
  IServiceResponse,
} from "../common/types";
import { generateAPIResponse } from "../common/helper";
import {
  getCommentsByOffset,
  addCommentForProject,
  editCommentById,
  deleteCommentById,
} from "../services/project_comments";
import { Types } from "mongoose";
import { RESPONSE_STATUS } from "../common/constants";

export const getComments = async (
  req: IRequestWithUserDetails
): Promise<IControllerResponse> => {
  try {
    const { projectId } = req.params;
    const { offset = 0 } = req.query;

    const { status, message, data, success }: IServiceResponse =
      await getCommentsByOffset({
        projectId: projectId as unknown as Types.ObjectId,
        offset: offset as number,
      });

    const commentsData = data.map(({ userDetails, ...rest }: any) => {
      const { github_id, avatar_url } = userDetails[0]
      return { ...rest, user_name: github_id, user_avatar_url: avatar_url };
    });

    return {
      status,
      response: generateAPIResponse({ message, success, data: commentsData }),
    };
  } catch (error) {
    throw error;
  }
};

export const addComment = async ({
  params,
  body,
  user,
}: IRequestWithUserDetails): Promise<IControllerResponse> => {
  try {
    const { projectId } = params;
    const { commentText = "" } = body || {};
    const { userId } = user;
    if (!commentText) {
      return {
        status: RESPONSE_STATUS.Bad_Request,
        response: generateAPIResponse({
          message: "Comment shouldn't be empty",
        }),
      };
    }

    const { status, message, data, success }: IServiceResponse =
      await addCommentForProject({
        userId,
        commentText,
        projectId: projectId as unknown as Types.ObjectId,
      });

    return {
      status,
      response: generateAPIResponse({ message, success, data }),
    };
  } catch (error) {
    throw error;
  }
};

export const editComment = async ({
  params,
  body,
  user,
}: IRequestWithUserDetails): Promise<IControllerResponse> => {
  try {
    const { commentId } = params;
    const { commentText = "" } = body || {};
    const { userId } = user;
    if (!commentText) {
      return {
        status: RESPONSE_STATUS.Bad_Request,
        response: generateAPIResponse({
          message: "Comment shouldn't be empty",
        }),
      };
    }

    const { status, message, data, success }: IServiceResponse =
      await editCommentById({
        userId: userId as unknown as Types.ObjectId,
        commentId: commentId as unknown as Types.ObjectId,
        commentText,
      });

    return {
      status,
      response: generateAPIResponse({ message, success, data }),
    };
  } catch (error) {
    throw error;
  }
};

export const deleteComment = async ({
  params,
  user,
}: IRequestWithUserDetails): Promise<IControllerResponse> => {
  try {
    const { commentId } = params;
    const { userId } = user;

    const { status, message, data, success }: IServiceResponse =
      await deleteCommentById({
        userId: userId as unknown as Types.ObjectId,
        commentId: commentId as unknown as Types.ObjectId,
      });

    return {
      status,
      response: generateAPIResponse({ message, success, data }),
    };
  } catch (error) {
    throw error;
  }
};
