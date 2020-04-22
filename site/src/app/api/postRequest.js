import { errors } from '../main/errorHandler';

async function postRequest (url, headers, body, abort, token, responceType) {
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Pragma: 'no-cache',
            ...headers,
        },
        signal: abort,
    };
    if (body) {
        options.body = body;
    }
    if (token) {
        options.headers.Authorization = `Bearer ${token}`;
    }
    let response;
    try {
        response = await fetch(url, options);
        if (response.ok) {
            let data = null;
            if (responceType == "json") {
                data = await response.json();
            }
            return data;
        }
    } catch (error) {
        throw errors.INTERNAL_SERVER_ERROR;
    }
    if (!response.ok) {
        if (token && response.status === 401) {
            throw errors.SESSION_EXPIRED;
        } else if (token && response.status === 403) {
            throw errors.FORBIDDEN;
        } else if (!token && (response.status === 404 || response.status === 400)) {
            throw errors.BAD_LOGIN_DATA;
        } else {
            throw errors.INTERNAL_SERVER_ERROR;
        }
    }
}

export async function post (url, headers, abort, token) {
    return await postRequest(url, headers, abort, token, null);
}

export async function postJson (url, headers, body, abort, token) {
    return await postRequest(url, headers, body, abort, token, "json");
}