function unauthorizedResponse(error: string) {
    return new Response(JSON.stringify({ success: false, error }), { status: 401 }).json();
}

function badRequestResponse(error: string) {
    return new Response(JSON.stringify({ success: false, error }), { status: 400 }).json();
}

function forbiddenResponse(error: string) {
    return new Response(JSON.stringify({ success: false, error }), { status: 403 }).json();
}

function successResponse(data: any, status: number = 200) {
    return new Response(JSON.stringify({ success: true, message: data }), { status }).json();
}

function errorResponse(error: string, status: number = 500) {
    return new Response(JSON.stringify({ success: false, error }), { status }).json();
}

function notFoundResponse(error: string) {
    return new Response(JSON.stringify({ success: false, error }), { status: 404 }).json();
}

export { unauthorizedResponse, forbiddenResponse, successResponse, errorResponse, notFoundResponse, badRequestResponse };
