import{ Schema, model, SchemaTypes } from "mongoose";

const ProjectCommentSchema: Schema = new Schema({
    user_id: SchemaTypes.ObjectId,
    project_id: SchemaTypes.ObjectId,
    comment: String,
    is_deleted: Boolean,
    created_on: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    modified_on: {
        type: Date,
        default: () => Date.now()
    }
});

const Comment = model('project_comments', ProjectCommentSchema)

export default Comment;