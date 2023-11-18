import { SANITIZATION_OPTIONS } from "./constants";
import { IAPIResponse, IAPIResponseArgs } from "./types";
import sanitizeHtml from 'sanitize-html';

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

export const sanitizeHTML = (contentToBeSanitized: string) => {
  if(!contentToBeSanitized) {
    return contentToBeSanitized
  } 

  return sanitizeHtml(contentToBeSanitized, SANITIZATION_OPTIONS);
}

export const getNameFromEmailId = (email: string): string => {
  const firstEmailPart = email.split("@")[0];
  const nameParts = firstEmailPart.split(".").map(namePart => `${namePart[0]?.toUpperCase()}${namePart.slice(1)}`)
  return nameParts.join(" ")
}