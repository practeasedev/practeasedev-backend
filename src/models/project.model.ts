import{ Schema, model } from "mongoose";

enum Difficulty_Level {
    beginner='beginner',
    intermediate='intermediate',
    advanced='advanced',
    pro='pro'
}

enum Category {
    components="components",
    singlePage='single page',
    multiPage='multi page',
    backend='backend',
    fullStack='full stack'
}

const ProjectSchema: Schema = new Schema({
    project_name: String,
    project_description: String,
    project_image: String,
    difficulty_level: {
        type: String,
        enum: Difficulty_Level,
        default: Difficulty_Level.beginner
    },
    slug: String,
    category: {
        type: String,
        enum: Category,
        default: Category.components
    },
    figma_link: String,
    user_stories: [String],
    download_link: String,
    key_concepts: [String],
    resource_links: [String],  
    created_on: {
        type: String,
        immutable: true,
        default: () => new Date().toLocaleString()
    },
    modified_on: {
        type: String,
        default: () => new Date().toLocaleString()
    },
    likes: Number,
});

const Project = model("projects", ProjectSchema)

export default Project;