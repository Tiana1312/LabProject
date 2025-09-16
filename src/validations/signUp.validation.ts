import {CreateError} from "@/errors";
import {ISignUp, passwordRegex, emailRegex, LabStaffRoleEnum} from "@/shared";

export function signUpValidation({firstName, lastName, email, password, role}: ISignUp) {

    if (!firstName || !lastName || !email || !password || !role) {
        CreateError.validation(
            "Provide all required fields"
        );
    }

    if (!emailRegex.test(email)) {
        throw CreateError.validation(
            "Invalid email format"
        );
    }
    
    if (!passwordRegex.test(password)) {
        throw CreateError.validation(
            "Password must be at least 8 characters and one number"
        );
    }

    if (!Object.values(LabStaffRoleEnum).includes(role)){
        throw CreateError.validation(
            "Invalid role value"
        );
    }
}