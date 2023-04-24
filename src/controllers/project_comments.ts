import { Request } from "express";
import { IControllerResponse, IServiceResponse } from "../common/types";
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
  req: Request
): Promise<IControllerResponse> => {
  try {
    const { projectId } = req.params;
    const { offset = 0 } = req.query;

    const { status, message, data, success }: IServiceResponse =
      await getCommentsByOffset({
        projectId: projectId as unknown as Types.ObjectId,
        offset: offset as number,
      });

    return {
      status,
      response: generateAPIResponse({ message, success, data }),
    };
  } catch (error) {
    throw error;
  }
};

export const addComment = async (
  req: Request
): Promise<IControllerResponse> => {
  try {
    const { userId, projectId } = req.params;
    const { commentText = "" } = req.body || {};
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

export const editComment = async (
  req: Request
): Promise<IControllerResponse> => {
  try {
    const { commentId, userId } = req.params;
    const { commentText = "" } = req.body || {};
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

export const deleteComment = async (
  req: Request
): Promise<IControllerResponse> => {
  try {
    const { commentId, userId } = req.params;

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
