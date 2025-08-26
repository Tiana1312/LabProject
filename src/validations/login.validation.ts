import {CreateError} from "@/errors";

export function loginValidation(email: string, password: string) {
    if (!email.includes("@")) {
        throw CreateError.validation("Invalid email")
    };
    if (password.length < 6) {
        throw CreateError.validation("Incorrect password");
    }
}