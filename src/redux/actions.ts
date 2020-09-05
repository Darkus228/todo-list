import { ReduxAction, TodoItemType } from '../utils/types';

let nextTodoId = 0;

export const addTodo: (content: string) => ReduxAction<TodoItemType> = (content) => ({
    type: 'ADD_TODO',
    payload: {
        id: nextTodoId++,
        description: content,
        completed: false,
    },
});

export const toggleTodo: (id: number) => ReduxAction<TodoItemType> = (id) => ({
    type: 'TOGGLE_TODO',
    payload: {
        id,
    },
});
