export interface IApiMetadata{
    page: number;
    count: number;
    total: number;
}

export interface IApiResponse<T>{
    data: T;
    metadata?: IApiMetadata;
}

export interface ILogin{
    email: string;
    password: string;
}