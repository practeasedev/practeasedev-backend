import { Schema, model, Document, SchemaTypes, Types } from "mongoose";

interface IProjectComments extends Document {
  user_id: Types.ObjectId;
  project_id: Types.ObjectId;
  comment: string;
  is_deleted?: boolean;
  created_on?: string;
  modified_on?: string;
}

const ProjectCommentSchema: Schema = new Schema<IProjectComments>({
  user_id: {
    type: SchemaTypes.ObjectId,
    required: true,
  },
  project_id: {
    type: SchemaTypes.ObjectId,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
  created_on: {
    type: String,
    immutable: true,
    default: () => new Date().toLocaleString(),
  },
  modified_on: {
    type: String,
    default: () => new Date().toLocaleString(),
  },
});

const projectComment = model<IProjectComments>(
  "project_comments",
  ProjectCommentSchema
);

export default projectComment;
