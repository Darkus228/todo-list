import { configureStore, combineReducers } from '@reduxjs/toolkit';
import TodosSlice from './reducers';

const store = configureStore({
    reducer: combineReducers({ todos: TodosSlice }),
});

export default store;
