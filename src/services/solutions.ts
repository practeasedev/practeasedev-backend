import { ObjectId } from "mongodb";
import solutions from "../models/solutions.model";
import { RESPONSE_STATUS } from "../common/constants";
import { IServiceResponse } from "../common/types";
import { Types } from "mongoose";

interface IPostSolutions {
  projectId: Types.ObjectId;
  userId: string;
  githubLink: string;
  description?: string;
}

interface IGetSolutionsByOffset {
  projectId: Types.ObjectId;
  offset?: number;
}

const SOLUTIONS_LIMIT = 5;

export const getSolutionsByOffset = async ({
  projectId,
  offset = 0,
}: IGetSolutionsByOffset): Promise<IServiceResponse> => {
  try {
    const solutionsByOffset = await solutions
      .aggregate([
        {$match: { project_id: { $eq: new ObjectId(projectId) } }},
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            pipeline: [{ $project: { _id: 0, github_id: 1, avatar_url: 1 } }],
            as: "userDetails",
          },
        },
        {
          $project: {
            _id: 1,
            user_id: 1,
            github_link: 1,
            description: 1,
            userDetails: 1,
            created_on: 1,
          },
        },
      ])
      .sort({ created_on: "desc" })
      .skip(offset * SOLUTIONS_LIMIT)
      .limit(SOLUTIONS_LIMIT);

    return {
      status: RESPONSE_STATUS.Success,
      success: true,
      message: solutionsByOffset.length
        ? "Successfully fetched comments"
        : "No comments",
      data: solutionsByOffset,
    };
  } catch (error) {
    throw error;
  }
};

export const postSolution = async ({
  projectId,
  userId,
  githubLink,
  description,
}: IPostSolutions): Promise<IServiceResponse> => {
  try {
    const postSolution = await solutions.create({
      project_id: new ObjectId(projectId),
      user_id: new ObjectId(userId),
      github_link: githubLink,
      description: description,
    });

    return {
      status: RESPONSE_STATUS.Success,
      success: true,
      message: postSolution
        ? "Successfully posted solution"
        : "Something went wrong",
      data: postSolution,
    };
  } catch (error) {
    throw error;
  }
};
