import {Response} from "express";
import {IApiResponse} from "@/shared"

export class ApiResponse {
    static success<T>(
        res: Response, 
        responsePayLoad: IApiResponse<T>, 
        statusCode = 200
    )
    {
        return res.status(statusCode).json(responsePayLoad);
    };

    static error(
        res: Response, 
        message = "Something went wrong", 
        statusCode = 500, 
    )
    {
        return res.status(statusCode).json({message});
    };
}

