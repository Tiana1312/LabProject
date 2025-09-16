import { LabStaffRoleEnum } from "@/shared";

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

export interface ISignUp{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: LabStaffRoleEnum;
    isActive: boolean;
}

export interface IjwtPayload{
    id: string;
    role: LabStaffRoleEnum;
}