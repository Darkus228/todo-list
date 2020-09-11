import { configureStore, createSlice, combineReducers } from '@reduxjs/toolkit';
import { TodoItemType } from '../utils/types';

let nextTodoId = 0;

const todosSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        addTodo: {
            reducer(state: TodoItemType[], action): void {
                const { description } = action.payload;
                state.push({ id: 0, description, completed: false, children: [] });
            },
            prepare(description: string): any {
                return { payload: { id: nextTodoId++, description, completed: false, children: [] } };
            },
        },
        addSubTodo: {
            reducer(state: TodoItemType[], action): void {
                const todo = state.find((todoItem) => todoItem.id === action.payload.id);
                todo?.children.push({
                    ...action.payload,
                    id: todo.children.slice(-1)[0] ? todo.children.slice(-1)[0].id + 1 : 0,
                });
            },
            prepare(parentId: number, description: string): any {
                return { payload: { id: parentId, description, completed: false, children: [] } };
            },
        },
        toggleTodo: {
            reducer(state: TodoItemType[], action): void {
                const todo = state.find((todo) => todo.id === action.payload);

                if (todo) {
                    todo.completed = !todo.completed;
                }
            },
            prepare(id: number): any {
                return { payload: { id } };
            },
        },
        changeTodo: {
            reducer(state: TodoItemType[], action): void {
                const todo = state.find((todoItem) => todoItem.id === action.payload.id);

                if (todo) {
                    todo.description = action.payload.description;
                }
            },
            prepare(id: number, description: string): any {
                return { payload: { id, description } };
            },
        },
    },
});

export const { addTodo, addSubTodo, toggleTodo, changeTodo } = todosSlice.actions;

const store = configureStore({
    reducer: combineReducers({ todos: todosSlice.reducer }),
});

export default store;
