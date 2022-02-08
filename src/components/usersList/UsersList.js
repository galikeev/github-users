import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {usersFetching, usersFetched, usersFetchingError, userSelected} from '../../actions/index';
import UsersListItem from '../usersListItem/UsersListItem';
import Spinner from '../spinner/Spinner';

const UsersList = () => {
    const {users, userStatus} = useSelector(state => state);
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

    const renderUsersList = (arr) => {
        return arr.map(({id, ...props}) => {
            return (
                <UsersListItem {...props} key={id}/>
            )
        })
    }

    const elements = renderUsersList(users);

    return (
        <div>
            {elements}
        </div>
    )
}

export default UsersList;