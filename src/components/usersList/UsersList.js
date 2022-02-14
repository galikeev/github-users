import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {usersFetching, 
        usersFetched, 
        usersFetchingError, 
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
    const {users, userStatus, selectedUser, isShow, followers, currentPage, perPage} = useSelector(state => state);
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

    if (userStatus === 'loading') {
        return <Spinner/>
    } else if (userStatus === 'error') {
        return <h5>ошибка</h5>
    }

    const onUserSelected = (id) => {
        dispatch({type: 'USER_SELECTED', payload: id})
        dispatch(followersFetching());
        const elems = users.find(elem => elem.id === id)
        request(elems.followers_url)
            .then(data => dispatch(followersFetched(data)))
            .catch(() => dispatch(followersFetcingError()))
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
                    <button className='user__button' onClick={() => dispatch(prevPage(currentPage - 9))}>Назад</button>
                    <button className='user__button' onClick={() => dispatch(nextPage(currentPage + 9))}>Далее</button>
                </div>
            </>
        )
    }

    const elements = renderUsersList(users);

    return (
        <div className='user'>
            {!isShow && elements}
            
            {isShow && <UserInfo userId={selectedUser} usersList={users} followers={followers} onLoadingUsers={onLoadingUsers}/>}
        </div>
    )
}

export default UsersList;