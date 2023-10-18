import{ Schema, model, SchemaTypes } from "mongoose";

const ProjectStatSchema: Schema = new Schema({
    is_completed: {
        type:Boolean,
        default: false
    },
    is_liked: {
        type:Boolean,
        default: false
    }
})

const UserProjectTrackingSchema:Schema = new Schema({
    user_id: SchemaTypes.ObjectId,
    project_stats: {
        type: SchemaTypes.Map,
        of: ProjectStatSchema
    }
});

const UserProjectTracking = model('user_project_tracking',UserProjectTrackingSchema)

export default UserProjectTracking;