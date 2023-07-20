import { Schema, model, Document, SchemaTypes, Types } from "mongoose";

interface IProjectComments extends Document {
  user_id: Types.ObjectId;
  project_id: Types.ObjectId;
  user_name: string;
  user_avatar_url: string;
  comment: string;
  is_deleted?: boolean;
  created_on?: number;
  modified_on?: number;
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
  user_name: {
    type: String,
    required: true,
  },
  user_avatar_url: {
    type: String,
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
    type: Number,
    immutable: true,
    default: () => new Date().getTime(),
  },
  modified_on: {
    type: Number,
    default: () => new Date().getTime(),
  },
});

const projectComment = model<IProjectComments>(
  "project_comments",
  ProjectCommentSchema
);

export default projectComment;
