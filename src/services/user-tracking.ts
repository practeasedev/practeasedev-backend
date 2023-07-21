import { RESPONSE_STATUS } from "../common/constants";
import { IServiceResponse } from "../common/types";
import Project from "../models/project.model";
import UserProjectTracking from "../models/user_project_tracking.model";

const getPersistUserTrackingMsg = (
  isLike: boolean,
  isCompleted: boolean
): string => {
  if (typeof isLike === "boolean" && typeof isCompleted === "boolean")
    return "Project status updated";
  if (typeof isLike === "boolean")
    return isLike ? "You Liked the Project" : "You Unliked the Project";
  if (typeof isCompleted === "boolean")
    return isCompleted
      ? "Project marked as completed"
      : "Project marked as incomplete";
  return "Error";
};

export const persistProjectStatus = async ({
  projectId,
  isLike,
  isCompleted,
  userId,
}): Promise<IServiceResponse> => {
  try {
    let persistedRecord;
    const userRecord = await UserProjectTracking.findOne({ user_id: userId });
    if (!userRecord) {
      const dataToPersist = {
        user_id: userId,
        project_stats: {
          [projectId]: {
            is_liked: isLike ?? false,
            is_completed: isCompleted ?? false,
          },
        },
      };
      persistedRecord = await UserProjectTracking.create(dataToPersist);
    } else {
      const projectStats = userRecord?.project_stats.get(projectId);
      const is_liked = projectStats?.get("is_liked") || false;
      const is_completed = projectStats?.get("is_completed") || false;
      const statsToPersist = {
        ...projectStats?._doc,
        is_liked: isLike ?? is_liked,
        is_completed: isCompleted ?? is_completed,
      };
      userRecord?.project_stats.set(projectId, statsToPersist);
      persistedRecord = await userRecord.save();
    }
    const projectDetails = await Project.findById(projectId);
    projectDetails.likes += 1;
    projectDetails.save()
    return {
      status: RESPONSE_STATUS.Success,
      success: true,
      message: getPersistUserTrackingMsg(isLike, isCompleted),
      data: persistedRecord.project_stats.get(projectId),
    };
  } catch (error) {
    throw error;
  }
};

export const queryProjectStatus = async ({ projectId, userId }) => {
  try {
    const userRecord = await UserProjectTracking.findOne({ user_id: userId });

    return {
      status: RESPONSE_STATUS.Success,
      success: true,
      message: "Status fetched successfuly",
      data: userRecord?.project_stats.get(projectId) || {
        is_liked: false,
        is_completed: false,
      },
    }
  } catch (error) {
    throw error;
  }
};
