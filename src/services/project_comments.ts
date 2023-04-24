import { ObjectId } from "mongodb";
import projectComment from "../models/comment.model";
import { IServiceResponse } from "../common/types";
import { Types } from "mongoose";
import { RESPONSE_STATUS } from "../common/constants";

interface IGetComments {
  projectId: Types.ObjectId;
  offset: number;
}

interface IAddCommentForProject {
  projectId: Types.ObjectId;
  userId: string;
  commentText: string;
}

interface IEditCommentById {
  userId: Types.ObjectId;
  commentId: Types.ObjectId;
  commentText: string;
}

interface IDeleteCommentById {
  userId: Types.ObjectId;
  commentId: Types.ObjectId;
}

const COMMENTS_LIMIT = 5;

export const getCommentsByOffset = async ({
  projectId,
  offset,
}: IGetComments): Promise<IServiceResponse> => {
  try {
    const comments = await projectComment
      .find({ project_id: { $eq: new ObjectId(projectId) } })
      .sort({ created_on: "desc" })
      .skip(offset)
      .limit(COMMENTS_LIMIT);

    return {
      status: RESPONSE_STATUS.Success,
      success: true,
      message: comments.length
        ? "Successfully fetched comments"
        : "No comments",
      data: comments,
    };
  } catch (error) {
    throw error;
  }
};

export const addCommentForProject = async ({
  projectId,
  userId,
  commentText,
}: IAddCommentForProject): Promise<IServiceResponse> => {
  try {
    const addedComment = await projectComment.create({
      project_id: new ObjectId(projectId),
      user_id: new ObjectId(userId),
      comment: commentText,
    });

    return {
      status: RESPONSE_STATUS.Success,
      success: true,
      message: addedComment
        ? "Successfully posted comment"
        : "Comment not found",
      data: addedComment,
    };
  } catch (error) {
    throw error;
  }
};

export const editCommentById = async ({
  userId,
  commentId,
  commentText,
}: IEditCommentById): Promise<IServiceResponse> => {
  try {
    const editedComment = await projectComment.findOne({
      _id: { $eq: new ObjectId(commentId) },
      user_id: { $eq: new ObjectId(userId) },
    });

    if (editedComment) {
      editedComment.comment = commentText;
      editedComment.save();
    }

    return {
      status: RESPONSE_STATUS.Success,
      success: true,
      message: editedComment
        ? "Successfully updated the comment"
        : "Comment not found",
      data: editedComment,
    };
  } catch (error) {
    throw error;
  }
};

export const deleteCommentById = async ({
  userId,
  commentId,
}: IDeleteCommentById): Promise<IServiceResponse> => {
  try {
    const deletedComment = await projectComment.findOneAndRemove({
      _id: { $eq: new ObjectId(commentId) },
      user_id: { $eq: new ObjectId(userId) },
    });

    return {
      status: RESPONSE_STATUS.Success,
      success: true,
      message: deletedComment
        ? "Successfully deleted the comment"
        : "Comment not found",
      data: deletedComment,
    };
  } catch (error) {
    throw error;
  }
};
