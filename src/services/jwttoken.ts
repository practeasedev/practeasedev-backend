import { sign, verify } from "jsonwebtoken";
import { IncomingHttpHeaders } from "http";
import { IUserObject, IVerifyJWTTokenReturnVal } from "../common/types";

export const createJWTToken = (userData: any) => {
  try {
    const token: string = sign(userData, process.env.JWT_SECRET, {
      expiresIn: "6h",
    });
    return token;
  } catch (error) {
    throw error;
  }
};

export const verifyJWTToken = (
  requestHeaders: IncomingHttpHeaders
): IVerifyJWTTokenReturnVal => {
  const authorizationHeader = requestHeaders.authorization as string;
  const jwt = authorizationHeader?.split(" ")[1];
  if (!jwt) return { authorizationSuccess: false };
  const userAuthDetails = verify(
    jwt,
    process.env.JWT_SECRET,
    (err, user: IUserObject) => {
      if (err) return { authorizationSuccess: false };
      return { ...user, authorizationSuccess: true };
    }
  );
  return userAuthDetails as unknown as IVerifyJWTTokenReturnVal;
};
