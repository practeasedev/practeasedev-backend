import { Request, Response } from "express";
import { verifyJWTToken } from "../services/jwttoken";
import { generateAPIResponse } from "../common/helper";
import { RESPONSE_STATUS, unguardedRoutes } from "../common/constants";

export const authorizationCheck = (req: Request, res: Response, next) => {
  if (unguardedRoutes.some((route) => req.originalUrl.includes(route))) next();
  else {
    const { authorizationSuccess, ...userDetails } = verifyJWTToken(
      req.headers
    );
    if (authorizationSuccess) {
      (req as any).user = userDetails;
      next();
    } else
      res
        .status(RESPONSE_STATUS.Unauthorized)
        .json(generateAPIResponse({ message: "Unauthorized", success: false }));
  }
};
