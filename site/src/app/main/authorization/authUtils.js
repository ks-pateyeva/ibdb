/* eslint-disable no-useless-escape */
export function getTokenFromCookies() {
    const tok = token();
    const exp = getCookie(cookieTypes.expires);
    const userId = getCookie(cookieTypes.userId);
    const expiration = exp != null && !isNaN(parseInt(exp)) ? new Date(parseInt(exp)) : null;
    const numberUserId = userId != null && !isNaN(parseInt(userId)) ? parseInt(userId) : null;
    if (tok && expiration && numberUserId != null) {
        return {
            token: true,
            expiration,
            userId: numberUserId,
        };
    } else {
        return null;
    }
}

export function token() {
    return getCookie(cookieTypes.token);
}

function getCookie(name) {
    const matches = document.cookie.match(
        new RegExp(`(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`
    ));
    return matches ? decodeURIComponent(matches[1]) : null;
}

export const cookieTypes = {
    token: "token",
    expires: "expires",
    userId: "userid",
};