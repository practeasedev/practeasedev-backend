import { generateAPIResponse } from "../common/helper";
import { ServiceResponse } from "../common/types";
import { getProjects } from "../services/projects"

export const getAllProjects = async () => {
    try {
        const result:ServiceResponse = await getProjects();

        if(!result.success) {
            return {
                status: result.status,
                response: generateAPIResponse(result.message)
            }
        }

        return {
            status: result.status,
            response: generateAPIResponse(result.message, result.success, result.data)
        }
    } catch(error) {
        throw error;
    }
}