

export const getAccessToken = () => {
    return sessionStorage.getItem('accessToken');
}

export const getRefreshToken = () => {
    return sessionStorage.getItem('refreshToken');
}

export const setAccessToken = (accessToken) => {
    sessionStorage.setItem('accessToken');
}

export const setRefreshToken = (refreshToken) => {
    sessionStorage.setItem('refreshToken');
}

export const getType = (value, body) => {
    if (value.params) {
        return { params: body };
    } else if (value.query) {
        return { query: typeof body === 'object' ? body._id : body };
    }
    return {};
};