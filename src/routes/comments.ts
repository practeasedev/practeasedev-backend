import { Response, Router } from "express";
import { getInternalServerResponse } from "../common/helper";
import {
  getComments,
  addComment,
  editComment,
  deleteComment,
} from "../controllers/project_comments";
import { RESPONSE_STATUS } from "../common/constants";
import { IRequestWithUserDetails } from "../common/types";

const commentsRouter = Router();

commentsRouter.get(
  "/get_comments/:projectId",
  async (req: IRequestWithUserDetails, res: Response) => {
    try {
      const { status, response } = await getComments(req);
      res.status(status).json(response);
    } catch (error) {
      res
        .status(RESPONSE_STATUS.Internal_Error)
        .json(getInternalServerResponse(error));
    }
  }
);

commentsRouter.post(
  "/:projectId/add_comment",
  async (req: IRequestWithUserDetails, res: Response) => {
    try {
      const { status, response } = await addComment(req);
      res.status(status).json(response);
    } catch (error) {
      res
        .status(RESPONSE_STATUS.Internal_Error)
        .json(getInternalServerResponse(error));
    }
  }
);

commentsRouter.put(
  "/edit_comment/:commentId",
  async (req: IRequestWithUserDetails, res: Response) => {
    try {
      const { status, response } = await editComment(req);
      res.status(status).json(response);
    } catch (error) {
      res
        .status(RESPONSE_STATUS.Internal_Error)
        .json(getInternalServerResponse(error));
    }
  }
);

commentsRouter.delete(
  "/delete_comment/:commentId",
  async (req: IRequestWithUserDetails, res: Response) => {
    try {
      const { status, response } = await deleteComment(req);
      res.status(status).json(response);
    } catch (error) {
      res
        .status(RESPONSE_STATUS.Internal_Error)
        .json(getInternalServerResponse(error));
    }
  }
);

export default commentsRouter;
