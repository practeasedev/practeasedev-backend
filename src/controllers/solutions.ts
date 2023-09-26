import { Types } from "mongoose";
import { IControllerResponse, IRequestWithUserDetails, IServiceResponse } from "../common/types"
import { getSolutionsByOffset, postSolution } from "../services/solutions";
import { generateAPIResponse } from "../common/helper";
import { RESPONSE_STATUS } from "../common/constants";

export const fetchSolutions = async ({params, query}: IRequestWithUserDetails): Promise<IControllerResponse> => {
    try {
        const { projectId } = params;
        const { offset = 0 } = query;
    
        const { status, message, data, success }: IServiceResponse =
          await getSolutionsByOffset({
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
}

export const submitSolution = async({params, body, user}: IRequestWithUserDetails): Promise<IControllerResponse> => {
    try {
        const { projectId } = params;
        const { githubLink, description } = body;
        const { userId } = user;

        if(!githubLink){
            return {
                status: RESPONSE_STATUS.Bad_Request,
                response: generateAPIResponse({
                  message: "Github link shouldn't be empty",
                }),
              };
        }
    
        const { status, message, data, success }: IServiceResponse =
          await postSolution({
            projectId: projectId as unknown as Types.ObjectId,
            userId,
            githubLink,
            description
          });
    
        return {
          status,
          response: generateAPIResponse({ message, success, data }),
        };
      } catch (error) {
        throw error;
      }
}