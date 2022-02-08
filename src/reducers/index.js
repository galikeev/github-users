const initialState = {
    users: [],
    userStatus: 'complete'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USERS_FETCHING':
            return {
                ...state,
                userStatus: 'loading'
            }
        case 'USERS_FETCHED':
            return {
                ...state,
                users: action.payload,
                userStatus: 'complete'
            }
        case 'USERS_FETCHING_ERROR':
            return {
                ...state,
                userStatus: 'error'
            }
        default: return state
    }
}

export default reducer;