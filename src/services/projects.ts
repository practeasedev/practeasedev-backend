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
        
        if(projects.length === 0) {
            return {
                status: 200,
                success: true,
                message: 'No projects exist',
                data:[]
            }
        }

        return {
            status: 200,
            success: true,
            message: 'Successfully fetched projects',
            data: projects
        }
    } catch(error) {
        throw error;
    }
}