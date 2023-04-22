export interface Response {
    message: string
    data: any
    success: boolean
}

export interface APIResponse extends Response{}

export interface ServiceResponse extends Response {
    status: number
}
 