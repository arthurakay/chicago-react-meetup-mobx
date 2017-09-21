import {observable, computed} from 'mobx';

class User {
    @observable firstName;
    @observable lastName;

    @computed get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    constructor({firstName = '', lastName = ''}) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

export default User;