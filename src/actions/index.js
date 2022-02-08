export const usersFetching = () => {
    return {
        type: 'USERS_FETCHING'
    }
}

export const usersFetched = (users) => {
    return {
        type: 'USERS_FETCHED',
        payload: users
    }
}

export const usersFetchingError = () => {
    return {
        type: 'USERS_FETCHING_ERROR'
    }
}

export const userSelected = (id) => {
    return {
        type: 'USERS_SELECTED',
        payload: id
    }
}