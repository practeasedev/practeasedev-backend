import express, { Request, Response } from 'express';
import { registerUser } from '../controllers/auth';
import { getInternalServerResponse } from '../common/helper';

const authRouter = express.Router();

authRouter.post('/register', async (req:Request, res:Response) => {
    try {
        const {status, response} = await registerUser(req);
        res.status(status).cookie('accessToken', response.data).json(response);
    } catch(error) {
        res.status(500).json(getInternalServerResponse(error));
    }
});

export default authRouter;