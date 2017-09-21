# Using MobX and React

This GitHub repo will serve as the live demo for a talk I gave to the [Chicago React Meetup](https://www.meetup.com/React-Chicago/events/238418830/) 
on September 27, 2017.

The purpose of my presentation ([slides available here]()) is to introduce people to MobX.

I also wrote up a synopsis of my presentation [on my blog](https://www.akawebdesign.com/2017/09/21/using-mobx-react/).

## Technical Bits

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

If you're looking to add `mobx` to your own project, you'll start by simply running:

    yarn add mobx-react
    


### @observable

Any value can be observable.



### @observer

Any React component can be an observer. 

As such, any component decorated as an observer will automatically re-render when changes are detected on observable values.


### @computed

Computed values are awesome! 

These are values that can be derived from state using a pure function. They will automatically be updated by MobX and optimized for performance.