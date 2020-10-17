import { configureStore, combineReducers } from '@reduxjs/toolkit';
import TodosSlice from './todoSlice';
import FilterSlice from './filterSlice';
import SearchSlice from './searchSlice';


const store = configureStore({
    reducer: combineReducers({ todos: TodosSlice, visibilityFilter: FilterSlice, search: SearchSlice }),
});

export default store;
