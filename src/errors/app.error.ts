export class AppError extends Error{
    public readonly statusCode: number;
    constructor(message: string, statusCode: number){
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor)
    }
}
export const CreateError = {
    validation: (message: string) => new AppError(message, 400),

    forbidden: (message: string) => new AppError(message, 403),

    notFound: (message: string) => new AppError(message, 404),
    
    unauthorized: (message: string) => new AppError(message, 401),

    server: (message: string) => new AppError(message, 500)
}
