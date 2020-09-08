import { ReduxAction, TodoItemType } from '../utils/types';

let nextTodoId = 0;

export const addTodo: (content: string) => ReduxAction<TodoItemType> = (content) => ({
    type: 'ADD_TODO',
    payload: {
        id: nextTodoId++,
        description: content,
        completed: false,
        children: [],
    },
});

export const addSubTodo: (parentId: number, description: string) => ReduxAction<TodoItemType> = (
    parentId,
    description,
) => ({
    type: 'ADD_SUBTODO',
    payload: {
        id: parentId,
        description,
        completed: false,
        children: [],
    },
});

export const toggleTodo: (id: number) => ReduxAction<{ id: number }> = (id) => ({
    type: 'TOGGLE_TODO',
    payload: {
        id,
    },
});

export const changeTodo: (id: number, newContent: string) => ReduxAction<{ id: number; description: string }> = (
    id,
    newContent,
) => ({
    type: 'CHANGE_TODO',
    payload: {
        id,
        description: newContent,
    },
});
