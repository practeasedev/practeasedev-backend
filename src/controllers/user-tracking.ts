import { generateAPIResponse } from "../common/helper";
import { IRequestWithUserDetails, IServiceResponse } from "../common/types";
import { Types } from "mongoose";
import { persistProjectStatus, queryProjectStatus } from "../services/user-tracking";

export const handlePersistProjectStatus = async (req: IRequestWithUserDetails) => {
  try {
    const { projectId } = req.params;
    const { userId } = req.user || {};
    const { isLike, isCompleted } = req.body;
    const { status, message, data, success }: IServiceResponse =
      await persistProjectStatus({
        projectId: projectId as unknown as Types.ObjectId,
        isLike,
        isCompleted,
        userId,
      });

    return {
      status,
      response: generateAPIResponse({ message, success, data }),
    };
  } catch (error) {
    throw error;
  }
};

export const getProjectStatus = async(req: IRequestWithUserDetails) => {
  try{
    const { projectId } = req.params;
    const { userId } = req.user;
    const {status, message, data, success }: IServiceResponse = await queryProjectStatus({projectId, userId});
    return {
      status,
      response: generateAPIResponse({message, success, data})
    }
  }catch(error){
    throw error;
  }
}