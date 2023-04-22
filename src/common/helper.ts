export const generateAPIResponse = (message:string, success: boolean = false, data: any = []) => {
    return {
        success,
        message,
        data
    }
}

export const getInternalServerResponse = (error:any) => {
    const message:string = (process.env.NODE_ENV === 'DEVELOPMENT') ? error.message : 'Something went wrong';
    return generateAPIResponse(message);
 }