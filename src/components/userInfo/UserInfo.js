import './userInfo.scss';

const UserInfo = ({userId, usersList, followers, onLoadingUsers}) => {

    const element = usersList.find(item => item.id === userId);

    const {login, avatar_url} = element;


    const follow = followers.length > 0 ? followers.map((elem) => {
        return (
            <div key={elem.id} className='followers__info'>
                <div className='followers__img'>
                    <img src={elem.avatar_url} alt={elem.login} />
                </div>
            </div>
        )
    }) : <div>подписчиков нет</div>

    return (
        <div className='info'>
            <div className='info__name'>{login}</div>
            <div className='info__img'>
                <img src={avatar_url} alt={login} />
            </div>
            <div>Подписчики</div>
            <div className='followers'>{follow}</div>
            <button className='user__button user__button_big' onClick={onLoadingUsers}>Назад к списку</button>
        </div>
    )
}

export default UserInfo;