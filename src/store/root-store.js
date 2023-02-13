import { configureStore } from '@reduxjs/toolkit'
import { reducer as formReducer } from 'redux-form'
import todosReducer from './todos-reducer';
 
export const store = configureStore({
    reducer: {
        form: formReducer,
        todos: todosReducer
    }
});

window.rootStore = store;