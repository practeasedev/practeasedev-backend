import { Request, Response, Router } from "express";
import { getInternalServerResponse } from "../common/helper";
import { getAllProjects, getSingleProject } from "../controllers/projects";
import { RESPONSE_STATUS } from "../common/constants";

const projectsRouter = Router();

projectsRouter.get("/:category", async (req: Request, res: Response) => {
  try { 
    const { status, response } = await getAllProjects(req)
    res.status(status).json(response);
  } catch (error) {
    res
      .status(RESPONSE_STATUS.Internal_Error)
      .json(getInternalServerResponse(error));
  }
});

projectsRouter.get("/:projectId", async (req: Request, res: Response) => {
  try {
    const { status, response } = await getSingleProject(req);
    res.status(status).json(response);
  } catch (error) {
    res
      .status(RESPONSE_STATUS.Internal_Error)
      .json(getInternalServerResponse(error));
  }
});

export default projectsRouter;
