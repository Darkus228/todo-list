import * as ActionType from './actionTypes';
import {combineReducers} from 'redux';

function todos(state = [], action) {
    switch (action.type) {
        case ActionType.ADD_TODO:
            return [...state, action.payload];
        case ActionType.REMOVE_TODO:
            return state.filter((todo) => todo.id !== action.payload);
        case ActionType.TOGGLE_TODO:
            return state.map((todo) => {
                if (todo.id === action.payload) {
                    todo.completed = !todo.completed
                }
                return todo;
            });
        default:
            return state;
    }
}

function visibilityFilter(state = ActionType.VisibilityFilters.SHOW_ALL, action) {
    switch (action.type) {
        case ActionType.SET_VISIBILITY_FILTER:
            return action.payload;
        default:
            return state;
    }
}

const todoApp = combineReducers({
    visibilityFilter,
    todos
});

export default todoApp;