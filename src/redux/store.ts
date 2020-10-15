import { configureStore, combineReducers } from '@reduxjs/toolkit';
import TodosSlice from './todoSlice';
import FilterSlice from './filterSlice';



const store = configureStore({
    reducer: combineReducers({ todos: TodosSlice, visibilityFilter: FilterSlice }),
});

export default store;
