import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoItemType, ReduxAction } from '../utils/types';
import { v4 as uuidv4 } from 'uuid';
import { changeTodosState, removeTodoItems, toggleChildrenTodos } from '../utils/helpers';

const todosSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        addTodo: {
            reducer(state: TodoItemType[], action: PayloadAction<TodoItemType>): void {
                state.push(action.payload);
            },
            prepare(description: string): ReduxAction<TodoItemType> {
                return { payload: { id: uuidv4(), description, completed: false, children: [] } };
            },
        },
        addSubTodo: {
            reducer(state: TodoItemType[], action: PayloadAction<TodoItemType>): void {
                changeTodosState(state, (todo: TodoItemType): void => {
                    if (todo.id === action.payload.id) {
                        todo?.children.push({
                            ...action.payload,
                            id: uuidv4(),
                        });
                    }
               });
            },
            prepare(parentId: string, description: string): ReduxAction<TodoItemType> {
                return { payload: { id: parentId, description, completed: false, children: [] } };
            },
        },
        toggleTodo: {
            reducer(state: TodoItemType[], action: PayloadAction<{ id: string }>): void {
                changeTodosState(state, (todo: TodoItemType) => {
                    if (todo.id === action.payload.id) {
                        todo.completed = !todo.completed;
                        toggleChildrenTodos(todo.completed, todo.children);
                    }
                });
            },
            prepare(id: string): ReduxAction<{ id: string }> {
                return { payload: { id } };
            },
        },
        changeTodo: {
            reducer(state: TodoItemType[], action: PayloadAction<{ id: string; description: string }>): void {
                changeTodosState(state, (todo: TodoItemType): void => {
                    if (todo.id === action.payload.id) {
                        todo.description = action.payload.description;
                    }
                });
            },
            prepare(id: string, description: string): ReduxAction<{ id: string; description: string }> {
                return { payload: { id, description } };
            },
        },
        removeTodo: {
            reducer(state: TodoItemType[], action: PayloadAction<{ id: string }>): void {
                removeTodoItems(state, action);
            },
            prepare(id: string): ReduxAction<{ id: string }> {
                return { payload: { id } };
            }
        },
    },
});

export const { addTodo, addSubTodo, toggleTodo, changeTodo, removeTodo } = todosSlice.actions;

export default todosSlice.reducer;
