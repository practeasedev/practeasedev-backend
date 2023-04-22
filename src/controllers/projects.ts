import { generateAPIResponse } from "../common/helper";
import { IServiceResponse } from "../common/types";
import { getProjects } from "../services/projects"

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