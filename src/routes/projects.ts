import { Request, Response, Router } from 'express';
import { getInternalServerResponse } from '../common/helper';
import { getAllProjects, getSingleProject } from '../controllers/projects';

const projectsRouter = Router();

projectsRouter.get('/', async (req:Request, res:Response) => {
    try {
        const {status, response} = await getAllProjects();
        res.status(status).json(response);
    } catch (error) {
        res.status(500).json(getInternalServerResponse(error));
    }
});

projectsRouter.get('/:projectId', async (req:Request, res:Response) => {
    try {
        const {status, response} = await getSingleProject(req);
        res.status(status).json(response);
    } catch (error) {
        res.status(500).json(getInternalServerResponse(error));
    }
})

export default projectsRouter;