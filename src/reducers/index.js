const initialState = {
    users: [],
    userStatus: 'complete',
    selectedUsers: null
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
                selectedUsers: state.users.filter(elem => elem.id === action.payload)
            }
        default: return state
    }
}

export default reducer;