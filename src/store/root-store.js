import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { reducer as formReducer } from 'redux-form'
import { todosReducer } from './todos-reducer';
 
const rootReducer = combineReducers({
    form: formReducer,
    todos: todosReducer
})

export const store = configureStore({
    reducer: rootReducer
});

window.rootStore = store;