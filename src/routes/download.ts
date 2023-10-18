import { Request, Response, Router } from 'express';
import { RESPONSE_STATUS } from '../common/constants';
import { generateAPIResponse, getInternalServerResponse } from '../common/helper';
import { downloadProjectFolderPath } from '../controllers/download';

const downloadRouter = Router();

downloadRouter.get('/:projectName', (req:Request, res:Response) => {
    try {
        const {status, response} = downloadProjectFolderPath(req);
        if(!response.success) {
            res.status(status).json(response);
        } else {
            res.download(response.data, (error) => {
                if(error) {
                   console.log(error);
                }
            });
        }
    } catch(error) {
        res
        .status(RESPONSE_STATUS.Internal_Error)
        .json(getInternalServerResponse(error));
    }
});

export default downloadRouter;