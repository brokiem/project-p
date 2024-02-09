import type { User } from "~/utils/user";

const API_BASE_URL = process.env.API_BASE_URL || "";
const API_URL = "/api/";
const API_VERSION = "v1";
const API_ROUTE = `${API_BASE_URL}${API_URL}${API_VERSION}`;

export interface Result {
    success: boolean;
}

export interface ErrorResult extends Result {
    error: string;
}

export interface SuccessResult<T> extends Result {
    message: T;
}

export interface LoginResult {
    token: string;
    user: User;
}

export interface VerifyResult {
    user: User;
}

function makeRequest<T>(url: string, options: RequestInit): Promise<T> {
    return new Promise<T>(async (resolve, reject) => {
        const response = await fetch(url, options);
        const result = await response.json() as Result;

        if (result.success) {
            const successResult = result as SuccessResult<T>;
            resolve(successResult.message);
        } else {
            const errorResult = result as ErrorResult;
            reject(errorResult);
        }
    });
}

/**
 * Login to the website
 * @param username
 * @param password
 * @returns Promise<LoginResult>
 */
export async function login(username: string, password: string) {
    return makeRequest<LoginResult>(`${API_ROUTE}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });
}

/**
 * Verify a token
 * @param token
 * @returns Promise<VerifyResult>
 */
export async function verify(token: string) {
    return makeRequest<VerifyResult>(`${API_ROUTE}/auth/verify`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
}
