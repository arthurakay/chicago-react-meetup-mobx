import React from 'react';
import {observer, inject} from 'mobx-react';

@inject('userStore') @observer
class UserList extends React.Component {
    render() {
        const users = [];

        for (let i = 0; i < this.props.userStore.data.length; i++) {
            let user = this.props.userStore.data[i];
            users.push(<li key={i}>{user.fullName}</li>);
        }

        return (
            <div id="UserList">
                <h2>Users</h2>

                <ul>
                    {users}
                </ul>
            </div>
        );
    }
}

export default UserList;