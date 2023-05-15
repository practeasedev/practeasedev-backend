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
