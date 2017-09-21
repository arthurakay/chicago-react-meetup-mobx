import {observable, action} from 'mobx';

class Users {
    @observable data = [];

    @action addUser() {
        this.data.push({
            firstName: 'John',
            lastName: 'Doe'
        });
    }
}

export default Users;