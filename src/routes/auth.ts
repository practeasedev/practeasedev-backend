import express, { Request, Response } from "express";
import { registerUser } from "../controllers/auth";
import { generateAPIResponse, getInternalServerResponse } from "../common/helper";
import { RESPONSE_STATUS } from "../common/constants";

const authRouter = express.Router();

authRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const { status, response } = await registerUser(req);
    res.status(status).cookie("accessToken", response.data).json(response);
  } catch (error) {
    res
      .status(RESPONSE_STATUS.Internal_Error)
      .json(getInternalServerResponse(error));
  }
});

authRouter.delete("/logout", async(req:Request, res:Response) => {
  try {
    res.status(RESPONSE_STATUS.Success).clearCookie('accessToken', {
      domain: 'http://localhost:3000',
      path: '/'
    }).json(generateAPIResponse({ success: true, message: "Successfully logged out user"}));
    res.end();
  } catch (error) {
    res
      .status(RESPONSE_STATUS.Internal_Error)
      .json(getInternalServerResponse(error));
  }
})

export default authRouter;
