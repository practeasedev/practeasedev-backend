import { Request, Response, Router } from "express";
import { getInternalServerResponse } from "../common/helper";
import {
  getComments,
  addComment,
  editComment,
  deleteComment,
} from "../controllers/project_comments";

const commentsRouter = Router();

commentsRouter.get(
  "/get_comments/:projectId",
  async (req: Request, res: Response) => {
    try {
      const { status, response } = await getComments(req);
      res.status(status).json(response);
    } catch (error) {
      res.status(500).json(getInternalServerResponse(error));
    }
  }
);

commentsRouter.post(
  "/:projectId/add_comment/:userId",
  async (req: Request, res: Response) => {
    try {
      const { status, response } = await addComment(req);
      res.status(status).json(response);
    } catch (error) {
      res.status(500).json(getInternalServerResponse(error));
    }
  }
);

commentsRouter.put(
  "/edit_comment/:userId/:commentId",
  async (req: Request, res: Response) => {
    try {
      const { status, response } = await editComment(req);
      res.status(status).json(response);
    } catch (error) {
      res.status(500).json(getInternalServerResponse(error));
    }
  }
);

commentsRouter.delete(
  "/delete_comment/:userId/:commentId",
  async (req: Request, res: Response) => {
    try {
      const { status, response } = await deleteComment(req);
      res.status(status).json(response);
    } catch (error) {
      res.status(500).json(getInternalServerResponse(error));
    }
  }
);

export default commentsRouter;
