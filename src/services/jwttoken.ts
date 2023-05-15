import {sign} from 'jsonwebtoken';

export const createJWTToken = (userData: any) => { 
    try {
        const token:string = sign(userData, process.env.JWT_SECRET, {
            expiresIn: '6h'
        });
        return token
    } catch (error) {
        throw error;
    }
}