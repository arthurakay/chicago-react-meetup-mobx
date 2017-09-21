import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Provider} from 'mobx-react';
import UserStore from './stores/Users';
import UserList from './views/UserList';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>

                <Provider userStore={UserStore}>
                    <UserList />
                </Provider>
            </div>
        );
    }
}

export default App;