import {CreateError} from "@/errors";
import {ILogin, passwordRegex, emailRegex} from "@/shared"

export function loginValidation({email, password}: ILogin) {

    if (!email || !password) {
        CreateError.validation("Email and Password are required");
    }

    if (!emailRegex.test(email)) {
        throw CreateError.validation("Invalid email format");
    }
    
    if (!passwordRegex.test(password)) {
        throw CreateError.validation(
            "Password must be at least 8 characters and one number"
        );
    }


}