import { api } from "../../api";
import type { SignupRequest } from "./types";

export const signup = async (request:SignupRequest) => {
    try{
        const { data } = await api.post("/api/auth/signup", request);
        return data;
    } catch (error) {
        console.error("Error during signup:", error);
        throw error;
    }
}

