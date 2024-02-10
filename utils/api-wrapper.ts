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

function makeRequest<T>(url: string, options: RequestInit): Promise<T> {
    return new Promise<T>(async (resolve, reject) => {
        try {
            const { data } = await useFetch(url, {
                onRequest(c) {
                    c.options = options;
                },
            });

            const result = data.value as Result;

            if (result.success) {
                const successResult = result as SuccessResult<T>;
                resolve(successResult.message);
            } else {
                const errorResult = result as ErrorResult;
                reject(errorResult);
            }
        } catch (err: any) {
            const errorResult: ErrorResult = {
                success: false,
                error: "Internal server error",
            };
            reject(errorResult);
        }
    });
}

/**
 * Login to the website
 */
export async function login(username: string, password: string) {
    return makeRequest<{ token: string; user: User; }>(`${API_ROUTE}/auth/login`, {
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
 */
export async function verify(token: string) {
    return makeRequest<{ user: User; }>(`${API_ROUTE}/auth/verify`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
}

/**
 * Fetch all competencies
 */
export async function fetchCompetencies() {
    return makeRequest<{ competencies: { id: number; title: string; description: string; } }>(`${API_ROUTE}/competencies`, {
        method: "GET",
    });
}

/**
 * Create a new competency
 */
export async function createCompetency(title: string, description: string, token: string) {
    return makeRequest<{ competency: { id: number; title: string; description: string; } }>(`${API_ROUTE}/competencies`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            description,
        }),
    });
}

/**
 * Update a competency
 */
export async function updateCompetency(id: number, title: string, description: string, token: string) {
    return makeRequest<{ competencies: { id: number; title: string; description: string; } }>(`${API_ROUTE}/competencies/${id}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            description,
        }),
    });
}

/**
 * Delete a competency
 */
export async function deleteCompetency(id: number, token: string) {
    return makeRequest<{ competencies: { id: number; title: string; description: string; } }>(`${API_ROUTE}/competencies/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
}

/**
 * Fetch all extracurriculars
 */
export async function fetchExtracurriculars() {
    return makeRequest<{ extracurriculars: { id: number; title: string; description: string; extracurricular_mentors: { id: number; users: User; }[]; }[] }>(`${API_ROUTE}/extracurriculars`, {
        method: "GET",
    });
}

/**
 * Create a new extracurricular
 */
export async function createExtracurricular(title: string, description: string, mentor_uuids: string, token: string) {
    return makeRequest<{ extracurricular: { id: number; title: string; description: string; extracurricular_mentors: { id: number; users: User; }[]; } }>(`${API_ROUTE}/extracurriculars`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            description,
            mentor_uuids,
        }),
    });
}

/**
 * Update an extracurricular
 */
export async function updateExtracurricular(id: number, title: string, description: string, mentor_uuids: string, token: string) {
    return makeRequest<{ extracurricular: { id: number; title: string; description: string; extracurricular_mentors: { id: number; users: User; }[]; } }>(`${API_ROUTE}/extracurriculars/${id}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            description,
            mentor_uuids,
        }),
    });
}

/**
 * Delete an extracurricular
 */
export async function deleteExtracurricular(id: number, token: string) {
    return makeRequest<{ extracurriculars: { id: number; title: string; description: string; }[] }>(`${API_ROUTE}/extracurriculars/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
}
