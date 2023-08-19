import { Request } from "express";
import { getProjectFolderPath } from "../services/download";
import { IServiceResponse } from "../common/types";
import { generateAPIResponse } from "../common/helper";

export const downloadProjectFolderPath = (req:Request) => {
    try {
        const {projectName} = req.params;

        const { status, message, success, data }: IServiceResponse = getProjectFolderPath(projectName);

        return {
            status,
            response: generateAPIResponse({message, success, data})
        }
    } catch(error) {
        throw error;
    }
}