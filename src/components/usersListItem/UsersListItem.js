const UsersListItem = ({login, type, avatar_url}) => {
    return (
        <>
            <div>{login}</div>
            <div>{type}</div>
            <img src={avatar_url} alt={login} />
        </>
    )
}

export default UsersListItem;