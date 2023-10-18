import { Response, Router } from "express";
import { IRequestWithUserDetails } from "../common/types";
import { fetchSolutions, submitSolution } from "../controllers/solutions";
import { RESPONSE_STATUS } from "../common/constants";
import { getInternalServerResponse } from "../common/helper";

const solutionsRouter = Router();

solutionsRouter.get('/get/:projectId', async(req: IRequestWithUserDetails, res: Response)=> {
    try{
        const {status, response} = await fetchSolutions(req);
        res.status(status).json(response);
    } catch (error) {
      res
        .status(RESPONSE_STATUS.Internal_Error)
        .json(getInternalServerResponse(error));
    }
    
});

solutionsRouter.post('/submit_solution/:projectId' , async (req: IRequestWithUserDetails, res: Response) => {
    try {
      const { status, response } = await submitSolution(req);
      res.status(status).json(response);
    } catch (error) {
      res
        .status(RESPONSE_STATUS.Internal_Error)
        .json(getInternalServerResponse(error));
    }
  })

export default solutionsRouter;