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

export const followersFetching = () => {
    return {
        type: 'FOLLOWERS_FETCHING'
    }
}

export const followersFetched = (followers) => {
    return {
        type: 'FOLLOWERS_FETCHED',
        payload: followers
    }
}

export const followersFetcingError = () => {
    return {
        type: 'FOLLOWERS_FETCHING_ERROR'
    }
}

export const nextPage = (page) => {
    return {
        type: 'NEXT_PAGE',
        payload: page
    }
}

export const prevPage = (page) => {
    return {
        type: 'PREV_PAGE',
        payload: page
    }
}