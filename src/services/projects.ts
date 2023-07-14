import { RESPONSE_STATUS } from "../common/constants";
import Project from "../models/project.model";

export const getProjects = async (filters: any) => {
  try {
    const projects = await Project.find(
      { ...filters },
      {
        project_name: 1,
        project_description: 1,
        project_image: 1,
        difficulty_level: 1,
        likes: 1,
        category: 1,
        slug: 1,
      }
    );

    return {
      status: RESPONSE_STATUS.Success,
      success: true,
      message:
        projects.length === 0
          ? "No projects exist"
          : "Successfully fetched projects",
      data: projects,
    };
  } catch (error) {
    throw error;
  }
};

export const getProject = async (projectSlug: string) => {
  try {
    const project = await Project.findOne(
      { slug: projectSlug },
      { created_on: 0, modified_on: 0, __v: 0 }
    );

    return {
      status: RESPONSE_STATUS.Success,
      success: true,
      message: !project
        ? "No such project exists"
        : "Successfully fetched project details",
      data: project || {},
    };
  } catch (error) {
    throw error;
  }
};
