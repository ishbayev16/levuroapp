export const SET_MESSAGE = "set message";
export const SET_LOADING = "set loading";


export function setMessage(text, type) {
    return {
        type: SET_MESSAGE,
        payload: {
            text,
            type
        }
    }
}

export function setLoading(loading) {
    return {
        type: SET_LOADING,
        payload: {
            loading
        }
    }
}