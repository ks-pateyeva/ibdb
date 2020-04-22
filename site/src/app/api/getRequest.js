import { errors } from '../main/errorHandler';

async function getRequest(url, headers, abort, token, responseType) {
    const options = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Pragma: 'no-cache',
            ...headers,
        },
        //credentials: "omit",
        signal: abort,
    };
    if (token) {
        options.headers.Authorization = `Bearer ${token}`;
    }
    let response;
    //const dateStart = new Date();
    try {
        response = await fetch(url, options);
        if (response.ok) {
            let data = null;
            if (response.status == 204) {
                return null;
            } else if (responseType == "json") {
                data = await response.json();
            } else if (responseType == "text") {
                data = await response.text();
            } else if (responseType == "blob") {
                data = await response.blob();
            } else if (responseType == "arrayBuffer") {
                const array = await response.arrayBuffer();
                const header = response.headers.get("content-disposition");
                data = {
                    array,
                    header: header.replace("attachment; filename=", "").replace(`"`, ""),
                };
            }
            // const dateEnd = new Date();
            // console.log(`GET_START_${url}_${dateStart.getMinutes()}:${dateStart.getSeconds()}.${dateStart.getMilliseconds()}`);
            // console.log(`GET_FINISH_${url}_${dateEnd.getMinutes()}:${dateEnd.getSeconds()}.${dateEnd.getMilliseconds()}`);
            // console.log(`GET_TIME_${url}_${dateEnd.getTime() - dateStart.getTime()}`);
            return data;
        }
    } catch (error) {
        console.error(error);
        throw errors.INTERNAL_SERVER_ERROR;
    }
    if (!response.ok) {
       if (response.status === 401) {
            throw errors.SESSION_EXPIRED;
        } else if (response.status === 403) {
            throw errors.FORBIDDEN;
        } else {
            throw errors.INTERNAL_SERVER_ERROR;
        }
    }
}

export async function getJson (url, headers, abort, token) {
    return await getRequest(url, headers, abort, token, "json");
}

export async function getText (url, headers, abort, token) {
    return await getRequest(url, headers, abort, token, "text");
}

export async function getBlob (url, headers, abort, token) {
    return await getRequest(url, headers, abort, token, "blob");
}

export async function getArrayBuffer (url, headers, abort, token) {
    return await getRequest(url, headers, abort, token, "arrayBuffer");
}