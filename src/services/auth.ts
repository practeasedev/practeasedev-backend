import { RESPONSE_STATUS } from "../common/constants";
import User from "../models/user.model";

export const getUserDataIfExists = async (email: string) => {
    try {
        const userData = await User.findOne(
            {github_email: email},
            {_id:1 , avatar_url: 1, github_id: 1, is_account_deleted: 1}
        );

        if(!userData) {
            return {
                status: RESPONSE_STATUS.Bad_Request,
                success: false,
                message: 'No user with the given email id exists',
                data: {}
            }
        }

        return {
            status: RESPONSE_STATUS.Success,
            success: true,
            message: 'User exists with the given data',
            data: userData
        }
    } catch (error) {
        throw error;
    }
}

export const createNewUser = async (email:string, avatarUrl:string, name:string) => {
    try {
        const newUser = await User.create([
            {
                github_email: email,
                github_id: name,
                avatar_url: avatarUrl,
                completed_projects: 0,
                is_account_deleted: false,
            }
        ]);

        return {
            status: RESPONSE_STATUS.Success,
            success: true,
            message: 'Successfully created user',
            data: newUser[0]._doc
        }
    } catch(error) {
        throw error;
    }   
}

export const deleteUser =  async (userId: string) => {
    try {
        const deletedUser = await User.updateOne({
            _id: userId
        }, {
            is_account_deleted: true
        });
        
        return {
            status: deleteUser ? RESPONSE_STATUS.Success : RESPONSE_STATUS.Bad_Request,
            success: deletedUser ?  true : false,
            message: deletedUser
              ? "Successfully deleted the comment"
              : "User not found",
            data: {},
        }
    } catch(error) {
        throw error;
    }
}