import { Request } from "express";

export interface IResponse {
  message: string;
  data: any;
  success: boolean;
}

export interface IAPIResponse extends IResponse {}

export interface IServiceResponse extends IResponse {
  status: number;
}

export interface IControllerResponse {
  status: number;
  response: IAPIResponse;
}

export interface IAPIResponseArgs {
  message: string;
  success?: boolean;
  data?: any;
}

export interface IUserObject {
  userName: string;
  userId: string;
}

export interface IVerifyJWTTokenReturnVal extends Partial<IUserObject> {
  authorizationSuccess: boolean;
}

export interface IRequestWithUserDetails extends Request {
  user: IUserObject;
}
