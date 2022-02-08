import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {usersFetching, usersFetched, usersFetchingError, followersFetching, followersFetched, followersFetcingError } from '../../actions/index';
import UsersListItem from '../usersListItem/UsersListItem';
import UserInfo from '../userInfo/UserInfo';
import Spinner from '../spinner/Spinner';

import './usersList.scss'; 

const UsersList = () => {
    const {users, userStatus, selectedUser, isShow, followers} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(usersFetching());
        request('https://api.github.com/users')
            .then(data => dispatch(usersFetched(data)))
            .catch(() => dispatch(usersFetchingError()))
        // eslint-disable-next-line    
    }, [])

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
            <ul className='user__list'>
                {elems}
            </ul>
        )
    }

    const elements = renderUsersList(users);

    return (
        <div className='user'>
            {elements}
            {isShow && <UserInfo userId={selectedUser} usersList={users} followers={followers}/>}
        </div>
    )
}

export default UsersList;