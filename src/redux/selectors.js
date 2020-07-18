import { VisibilityFilters } from "./actionTypes";

export const getTodosByVisibilityFilter = (store, visibilityFilter) => {
    const allTodos = store.todos;
    switch (visibilityFilter) {
        case VisibilityFilters.SHOW_COMPLETED:
            return allTodos.filter(todo => todo.completed);
        case VisibilityFilters.SHOW_ACTIVE:
            return allTodos.filter(todo => !todo.completed);
        case VisibilityFilters.SHOW_ALL:
        default:
            return allTodos;
    }
}