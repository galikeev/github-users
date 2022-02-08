const initialState = {
    users: [],
    userStatus: 'complete',
    selectedUser: null,
    isShow: false,
    followers: [],
    followersStatus: 'complete'
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
        case 'USER_SELECTED':
            return {
                ...state,
                selectedUser: action.payload,
                isShow: true
            }
        case 'FOLLOWERS_FETCHING':
            return {
                ...state,
                followersStatus: 'loading'
            }
        case 'FOLLOWERS_FETCHED':
            return {
                ...state,
                followers: action.payload,
                followersStatus: 'complete'
            }
        case 'FOLLOWERS_FETCHING_ERROR':
            return {
                ...state,
                followersStatus: 'error'
            }
        default: return state
    }
}

export default reducer;