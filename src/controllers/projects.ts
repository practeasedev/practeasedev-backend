import { Request } from "express";
import { generateAPIResponse } from "../common/helper";
import { IServiceResponse } from "../common/types";
import { getProject, getProjects } from "../services/projects";
import { ObjectId } from "mongodb";

export const getAllProjects = async (req: Request) => {
  try {
    const { filters, categories, sort } = req.body;
    const { status, message, success, data }: IServiceResponse =
      await getProjects(filters, categories, sort);
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
    const { projectSlug } = req.params;
    if (!projectSlug) {
      return {
        status: 400,
        response: generateAPIResponse({
          message: "Mandatory params are missing",
        }),
        data: {},
      };
    }

    const { status, message, success, data }: IServiceResponse =
      await getProject(projectSlug);

    return {
      status: status,
      response: generateAPIResponse({ message, success, data }),
    };
  } catch (error) {
    throw error;
  }
};
