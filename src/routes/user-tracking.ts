import express, { Response } from "express";
import { IRequestWithUserDetails } from "../common/types";
import { RESPONSE_STATUS } from "../common/constants";
import { getInternalServerResponse } from "../common/helper";
import { handlePersistProjectStatus, getProjectStatus } from "../controllers/user-tracking";

const userTrackingRouter = express.Router()

userTrackingRouter.post("/persist/:projectId", async (req: IRequestWithUserDetails, res: Response)=>{
    try {
        const { status, response } = await handlePersistProjectStatus(req);
        res.status(status).json(response);
      } catch (error) {
        res
          .status(RESPONSE_STATUS.Internal_Error)
          .json(getInternalServerResponse(error));
      }
})

userTrackingRouter.get("/get/:projectId", async (req: IRequestWithUserDetails, res: Response)=>{
  try {
      const { status, response } = await getProjectStatus(req);
      res.status(status).json(response);
    } catch (error) {
      res
        .status(RESPONSE_STATUS.Internal_Error)
        .json(getInternalServerResponse(error));
    }
})

export default userTrackingRouter;