import express, { Request, Response } from "express";
import { deleteUserFromDB, registerUser } from "../controllers/auth";
import { generateAPIResponse, getInternalServerResponse } from "../common/helper";
import { COOKIE_CONFIG, RESPONSE_STATUS } from "../common/constants";
import { IRequestWithUserDetails } from "../common/types";

const authRouter = express.Router();

authRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const { status, response } = await registerUser(req);
    res.status(status).json(response);
  } catch (error) {
    res
      .status(RESPONSE_STATUS.Internal_Error)
      .json(getInternalServerResponse(error));
  }
});

authRouter.delete("/logout", async(req:Request, res:Response) => {
  try {
    res.status(RESPONSE_STATUS.Success).clearCookie('accessToken', COOKIE_CONFIG).json(generateAPIResponse({ success: true, message: "Successfully logged out user"}));
    res.end();
  } catch (error) {
    res
      .status(RESPONSE_STATUS.Internal_Error)
      .json(getInternalServerResponse(error));
  }
})

authRouter.delete("/deleteAccount", async(req: IRequestWithUserDetails, res:Response) => {
  try {
    const { status, response } = await deleteUserFromDB(req);
    res.status(status).json(response);
  } catch(error) {
    res
      .status(RESPONSE_STATUS.Internal_Error)
      .json(getInternalServerResponse(error));
  }
})

export default authRouter;

