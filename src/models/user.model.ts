import{ Model, Models, Schema, model } from "mongoose";

const UserSchema: Schema = new Schema({
    github_email: String,
    user_name: String,
    github_id: Number,
    completed_projects: Number,
    is_account_deleted: Boolean,
    avatar_url: String,
    reason_for_delete: {
        type: String,
        default: null,
    },
    created_on: {
        type: Date,
        immutable: true,
    },
    modified_on: {
        type: Date,
        default: () => Date.now()
    }
});

const User = model('users', UserSchema)

export default User;