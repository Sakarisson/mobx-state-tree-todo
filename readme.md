# MobX State Tree Todo App
[The TasteJS Todo App](https://github.com/tastejs/todomvc) based on Mobx State Tree

# The purpose
*"The only way to learn a new programming language is by writing programs in it." - Dennis Ritchie*

The best way to learn a new framework, programming language or design pattern is to implement some software using it.

The idea behind this project is to implement a Todo Web Application using MobX State Tree as a state management library. 

# A little bit about MobX. 
MobX is a state management tool that utilizes the observer pattern to make state management really easy. Its main advantage the more popular framework Redux is its extremely low boilerplate. Any property or variable using the `observable` or `computed` decorators will "magically" stay up to date in any object using the `observer` decorator or Higher Order Component.

Directly mutating an observable property will be reflected in the application.

The main issue with MobX is the fact that it is so unopinionated that things still tend to become tightly coupled and difficult to maintain as the application scales. In fact, after a while, the boilerplate and forced patterns of Redux seem to become its strength.

# Introducing MobX State Tree
MobX State Tree (MST) combines the best of both worlds when it comes to the forced best practice of Redux and the low boilerplate of MobX. Similarly to MobX, MST allows any component with the `observer` decorator to reflect state changes consistently. However, MST also introduces an opinionated, typed store model. Every mutation must happen through `actions`, and each action re-creates the tree and uses a built-in reconciler to tell observers that the state was changed.

# The application
I based the application on the [Todo-MVC app specification](https://github.com/tastejs/todomvc/blob/master/app-spec.md). Pretty much all of the logic occurs in the store.

# The store
The store contains two models - Todo and Store. 
## The Todo model
The Todo model contains these fields:
- name - string (defaults to '')
- done - boolean (defaults to false)
- id - number (required)

It also contains actions to set name, to toggle done and to set done to a certain value.

## The Store model
The Store model contains these fields:
- todos - Array(Todo) (defaults to [])
- filter - string (defaults to 'all')

It also contains some `views`, which correspond to MobX `computed` properties. If you have used MobX before, you know that the real power of MobX comes from the `computed` property, and MST `views` are no different. They are defined as getters, and any `observer` will be able to watch it just as if they were regular properties (they update according to state changes).

Lastly, the Store model contains actions for adding todo, altering todos and changing the current filter.

## Middleware
The store instance utilizes the `onSnapshot` middleware to write the current state snapshot to localStorage on each change. This means that the application works smoothly between sessions.