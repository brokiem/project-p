function createResponse(data: any, error: string | null, status: number) {
    const responseBody = error ? { success: false, error } : { success: true, message: data };
    return new Response(JSON.stringify(responseBody), {
        headers: { "content-type": "application/json" },
        status,
    });
}

export function unauthorizedResponse(error: string) {
    return createResponse(null, error, 401);
}

export function badRequestResponse(error: string) {
    return createResponse(null, error, 400);
}

export function forbiddenResponse(error: string) {
    return createResponse(null, error, 403);
}

export function successResponse(data: any, status: number = 200) {
    return createResponse(data, null, status);
}

export function errorResponse(error: string, status: number = 500) {
    return createResponse(null, error, status);
}

export function notFoundResponse(error: string) {
    return createResponse(null, error, 404);
}
