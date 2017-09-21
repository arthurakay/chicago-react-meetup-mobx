import {observable, action, useStrict} from 'mobx';
import User from '../models/User';

// IF THIS IS TURNED ON, MOBX ENFORCES @action
useStrict(true);

class Users {
    @observable data = [];


    @action addUser() {
        this.data.push(new User({
            firstName: 'John',
            lastName: 'Doe'
        }));
    }
}

const UserStore = new Users();

// GLOBAL VARS BECAUSE I LIKE TO LIVE DANGEROUSLY
window.UserStore = UserStore;

export default UserStore;