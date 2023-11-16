import { Request } from "express"
import { generateAPIResponse } from "../common/helper"
import { RESPONSE_STATUS } from "../common/constants";
import { sendConactMail } from "../services/mailing";

export const sendEmail = async (req: Request) => {
    try {
        const {name, email, message} = req.body;

        if(!name || !email || !message) {
            return {
                status: RESPONSE_STATUS.Bad_Request,
                response: generateAPIResponse({
                    message: "Mandatory params are missing",
                })
            }
        }

        await sendConactMail(name, email, message);

        return {
            status: 200,
            response: generateAPIResponse({
                success: true,
                message: "Successfully sent mail"
            })
        }
    } catch(error) {
        throw error;
    }
}