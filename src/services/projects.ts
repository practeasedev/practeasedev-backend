import Project from "../models/project.model";

export const getProjects = async () => {
    try {
        const projects = await Project.find(
            {}, 
            {
                project_name: 1,
                project_description: 1,
                project_image: 1,
                difficulty_level: 1,
                likes: 1,
                category: 1,
                slug: 1
            }
        );

        return {
            status: 200,
            success: true,
            message: projects.length === 0 ? 'No projects exist': 'Successfully fetched projects',
            data: projects
        }
    } catch(error) {
        throw error;
    }
}