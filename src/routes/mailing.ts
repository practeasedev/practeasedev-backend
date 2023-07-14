import { Request, Response, Router } from 'express';
import { sendEmail } from '../controllers/mailing';
import { RESPONSE_STATUS } from '../common/constants';
import { getInternalServerResponse } from '../common/helper';

const mailingRouter = Router();

mailingRouter.post('/send-contact-email', async (req: Request, res: Response) => {
    try {
        const {status, response} = await sendEmail(req);
        res.status(status).json(response);
    } catch(error) {
        res
        .status(RESPONSE_STATUS.Internal_Error)
        .json(getInternalServerResponse(error));
    }
})

export default mailingRouter;