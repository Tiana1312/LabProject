import {Response} from "express";

export class ApiResponse {
    static success(
        res: Response, 
        data: any, 
        message = "Success", 
        statusCode = 200
    )
    {
        return res.status(statusCode).json({
            succes: true, 
            message, 
            data,
        });
    };

    static error(
        res: Response, 
        message = "Something went wrong", 
        statusCode = 500, 
        errors: any = null
    )
    {
        return res.status(statusCode).json({
            success: false, 
            message, 
            errors,
        });
    };
}