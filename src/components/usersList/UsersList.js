import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {usersFetching, 
        usersFetched, 
        usersFetchingError,
        oneUserFethcing,
        oneUserFetched,
        oneUserFethcingError,
        followersFetching, 
        followersFetched, 
        followersFetcingError, 
        nextPage, 
        prevPage } from '../../actions/index';
import UsersListItem from '../usersListItem/UsersListItem';
import UserInfo from '../userInfo/UserInfo';
import Spinner from '../spinner/Spinner';

import './usersList.scss'; 

const UsersList = () => {
    const {
            users, 
            status, 
            oneUser, 
            isShow, 
            followers, 
            currentPage, 
            perPage
        } = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        onLoadingUsers();
        // eslint-disable-next-line    
    }, [currentPage])

    const onLoadingUsers = () => {
        dispatch(usersFetching());
        request(`https://api.github.com/users?since=${currentPage}&per_page=${perPage}`)
            .then(data => dispatch(usersFetched(data)))
            .catch(() => dispatch(usersFetchingError()))
    }

    if (status === 'loading') {
        return <Spinner/>
    } else if (status === 'error') {
        return <h5>ошибка</h5>
    }

    const onUserSelected = (id) => {
        dispatch(oneUserFethcing());
        dispatch(followersFetching());
        const elem = users.find(elem => elem.id === id)
        request(`https://api.github.com/users/${elem.login}`)
            .then(data => dispatch(oneUserFetched(data)))
            .then(request(elem.followers_url)
                    .then(data => dispatch(followersFetched(data)))
                    .catch(() => dispatch(followersFetcingError()))
                )
            .catch(() => dispatch(oneUserFethcingError()))
    }

    const renderUsersList = (arr) => {
        const elems = arr.map(({id, ...props}) => {
            return (
                <UsersListItem {...props} key={id} onUserSelected={() => onUserSelected(id)}/>
            )
        })

        return (
            <>
                <ul className='user__list'>
                    {elems}
                </ul>
                <div className='user__btns'>
                    <button className='user__button' onClick={() => dispatch(prevPage(currentPage - 18))}>Назад</button>
                    <button className='user__button' onClick={() => dispatch(nextPage(currentPage + 18))}>Далее</button>
                </div>
            </>
        )
    }

    const elements = renderUsersList(users);

    return (
        <div className='user'>
            {!isShow && elements}
            
            {isShow && <UserInfo oneUser={oneUser} followers={followers} onLoadingUsers={onLoadingUsers}/>}
        </div>
    )
}

export default UsersList;