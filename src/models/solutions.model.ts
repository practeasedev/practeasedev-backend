import { Schema, model, Document, SchemaTypes, Types } from "mongoose";

interface ISolutions extends Document {
  user_id: Types.ObjectId;
  project_id: Types.ObjectId;
  description: string;
  github_link: string;
  is_deleted?: boolean;
  created_on?: number;
  modified_on?: number;
}

const SolutionsSchema: Schema = new Schema<ISolutions>({
  user_id: {
    type: SchemaTypes.ObjectId,
    required: true,
  },
  project_id: {
    type: SchemaTypes.ObjectId,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  github_link: {
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

const solutions = model<ISolutions>(
  "solutions",
  SolutionsSchema
);

export default solutions;
