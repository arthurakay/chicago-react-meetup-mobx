# Using MobX and React

This GitHub repo will serve as the live demo for a talk I gave to the [Chicago React Meetup](https://www.meetup.com/React-Chicago/events/238418830/) 
on September 27, 2017.

The purpose of my presentation ([slides available here](https://slidr.io/arthurakay/mobx-and-react#1)) is to introduce people to MobX.

I also wrote up a synopsis of my presentation [on my blog](https://www.akawebdesign.com/2017/09/21/using-mobx-react/).

## Technical Bits

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Want to run this thing?

    // install dependencies
    yarn
    
    // fire this thang up
    yarn start

...then be prepared to be disappointed as most of my live demo is going to live in devtools JS console!

### Add MobX to your own React project

If you're looking to add `mobx` to your own project, you'll start by simply running:

    yarn add mobx mobx-react
    
This will install both `mobx` and `mobx-react` packages.

### Start Coding!

Except... wait.

I talk a lot about how much I love [ES7 decorators](http://technologyadvice.github.io/es7-decorators-babel6/), yet you can't use 
them out of the box yet. I'm assuming you are using Babel/Webpack, so you'll have install one more thing:

    yarn add babel-plugin-transform-decorators-legacy

...and you'll have to configure that inside webpack:

    {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        loader: require.resolve('babel-loader'),
        options: {
            // THIS THING BELOW
            plugins: ['transform-decorators-legacy']
        }
    }

Something like that. Every webpack/babel setup is different, so your mileage may vary.

## My Live Demo

Using this project as an example, let's go over some key concepts:

### `@observable`

Any value can be observable.

Let's start in `/src/stores/Users.js`:

    import {observable} from 'mobx';
    
    class Users {
        @observable data = [];
    }
    
    export default new Users();

We have created an object containing an observable array of data. For now this contains no data, but we'll come back to that in a moment. 

### `<Provider />`, `@observer` and `@inject`

Any React component can be an observer. 

As such, any component decorated as an observer will automatically re-render when changes are detected on observable values.

Let's take a look at `/src/App.js`:

    import UserStore from './stores/Users';

    <Provider userStore={UserStore}>
        // children (observers) will go here shortly!
    </Provider>

Much like the approach Redux takes, we need a way to share the data contained in our "store" to any components who care to observe it. 
The `<Provider />` component simply allows us to define a prop "userStore" which will be magically available to deeply nested sub-components.

Next let's look at `/src/views/UserList.js`:

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

You'll notice the `render()` method loops over any `data` contained in the prop `userStore` and spits out a list of users -- there's no magic here.

However there IS magic in the line prefixing ES7 decorators:

    @inject('userStore') @observer
    
`@observer` tells MobX that this particular component to track which observables are used by `render()` (namely any prop that could be passed in). 
MobX will then automatically re-render the component when one of these values changes.

`@inject('userStore')` explicitly tells MobX to magically grab the prop `userStore` from _any_ `<Provider />` that is a parent of 
this component. We defined that a moment ago in `/src/App.js` -- so now it "just exists". 

### `@action`

Like any good implementation of Flux, MobX says that you shouldn't change an observable value unless it's the result of an "action".

In strict mode MobX will throw some fun errors. Notice I turned this on in `/src/stores/Users.js` (line 5) -- try removing 
the `@action` decorator on line 11 and watch what happens!

    @action addUser() {
        this.data.push(new User({
            firstName: 'John',
            lastName: 'Doe'
        }));
    }

### `@computed`

Computed values are awesome! 

These are values that can be derived from state using a pure function. They will automatically be updated by MobX and optimized for performance.

See `/src/models/User.js`:

    @computed get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

Any time that `firstName` or `lastName` for that particular model is updated, `fullName` will automatically re-compute, sending
signal flares to any observing components that they should re-render.