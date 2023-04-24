import { Request } from "express";
import { generateAPIResponse } from "../common/helper";
import { IServiceResponse } from "../common/types";
import { getProject, getProjects } from "../services/projects"
import { Types } from "mongoose";
import { ObjectId } from "mongodb";

export const getAllProjects = async () => {
    try {
        const result:IServiceResponse = await getProjects();

        return {
            status: result.status,
            response: generateAPIResponse(result.message, result.success, result.data)
        }
    } catch(error) {
        throw error;
    }
}

export const getSingleProject = async (req:Request) => {
    try {
        const {projectId} = req.params;
        if(!projectId) {
            return {
                status: 400,
                response: generateAPIResponse('Mandatory params are missing'),
                data: {}
            }
        }

        if(!ObjectId.isValid(projectId)) {
            return {
                status: 400,
                response: generateAPIResponse('Not a valid project id'),
                data:{}
            }
        }

        const result:IServiceResponse = await getProject(projectId);

        return {
            status: result.status,
            response: generateAPIResponse(result.message, result.success, result.data)
        }
    } catch(error) {
        throw error;
    }
}