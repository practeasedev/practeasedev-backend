export interface Response {
    message: string
    data: any
    success: boolean
}

export interface IAPIResponse extends Response{}

export interface IServiceResponse extends Response {
    status: number
}
 