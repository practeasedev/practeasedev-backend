import{ Model, Models, Schema, model } from "mongoose";

const UserSchema: Schema = new Schema({
    name: String,
    github_email: String,
    github_id: String,
    completed_projects: Number,
    is_account_deleted: Boolean,
    avatar_url: String,
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

const User = model('users', UserSchema)

export default User;