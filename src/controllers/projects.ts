import { Request } from "express";
import { generateAPIResponse } from "../common/helper";
import { IServiceResponse } from "../common/types";
import { getProject, getProjects } from "../services/projects";
import { ObjectId } from "mongodb";

export const getAllProjects = async () => {
  try {
    const { status, message, success, data }: IServiceResponse =
      await getProjects();

    return {
      status: status,
      response: generateAPIResponse({ message, success, data }),
    };
  } catch (error) {
    throw error;
  }
};

export const getSingleProject = async (req: Request) => {
  try {
    const { projectId } = req.params;
    if (!projectId) {
      return {
        status: 400,
        response: generateAPIResponse({
          message: "Mandatory params are missing",
        }),
        data: {},
      };
    }

    if (!ObjectId.isValid(projectId)) {
      return {
        status: 400,
        response: generateAPIResponse({ message: "Not a valid project id" }),
        data: {},
      };
    }

    const { status, message, success, data }: IServiceResponse =
      await getProject(projectId);

    return {
      status: status,
      response: generateAPIResponse({ message, success, data }),
    };
  } catch (error) {
    throw error;
  }
};
