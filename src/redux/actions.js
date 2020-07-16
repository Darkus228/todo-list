import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER } from './actionTypes';

let todoId = 0;

export function addTodo(value) {
    return { type: ADD_TODO, payload: {id: todoId++, value, completed: false} };
}

export function deleteTodo(id) {
    return { type: REMOVE_TODO, payload: id };
}

export function toggleTodo(id) {
    return { type: TOGGLE_TODO, payload: id };
}

export function setVisibilityFilter(filter) {
    return { type: SET_VISIBILITY_FILTER, payload: filter };
}