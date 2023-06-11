import { IAPIResponse, IAPIResponseArgs } from "./types";

export const generateAPIResponse = ({
  message,
  success = false,
  data = [],
}: IAPIResponseArgs): IAPIResponse => {
  return { success, message, data };
};

export const getInternalServerResponse = (error: any): IAPIResponse => {
  const message: string =
    process.env.NODE_ENV === "DEVELOPMENT"
      ? error.message
      : "Something went wrong";
  return generateAPIResponse({ message });
};
