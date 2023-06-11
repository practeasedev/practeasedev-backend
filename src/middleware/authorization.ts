import { Request, Response } from "express";
import { verifyJWTToken } from "../services/jwttoken";
import { generateAPIResponse } from "../common/helper";
import { RESPONSE_STATUS } from "../common/constants";

export const authorizationCheck = (req: Request, res: Response, next) => {
  const { authorizationSuccess, ...userDetails } = verifyJWTToken(req.headers);
  if (authorizationSuccess) {
    (req as any).user = userDetails;
    next();
  } else
    res
      .status(RESPONSE_STATUS.Unauthorized)
      .json(generateAPIResponse({ message: "Unauthorized", success: false }));
};
