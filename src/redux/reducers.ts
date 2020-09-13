import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { TodoItemType, ReduxAction } from '../utils/types';


function recursiveCheck(todos: TodoItemType[], action: any, callback: Function): TodoItemType[] {
    const { id } = action.payload;

    todos.forEach((todo) => {
        if (todo.id === id) {
            callback(todo, action);
        } else {
            return recursiveCheck(todo.children, action, callback);
        }
    });

    return todos;
}

function toggleChildrenTodos(todos: TodoItemType[]): TodoItemType[] {
    return todos.map((todo) => {
        if (todo.children.length > 0) {
            toggleChildrenTodos(todo.children);
        }

        todo.completed = !todo.completed;
        return todo;
    });

}

const todosSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        addTodo: {
            reducer(state: TodoItemType[], action: PayloadAction<TodoItemType>): void {
                state.push({ ...action.payload });
            },
            prepare(description: string): ReduxAction<TodoItemType> {
                return { payload: { id: uuidv4(), description, completed: false, children: [] } };
            },
        },
        addSubTodo: {
            reducer(state: TodoItemType[], action: PayloadAction<TodoItemType>): void {
                state = recursiveCheck(state, action, (todo: TodoItemType, action: any): void => {
                    todo?.children.push({
                        ...action.payload,
                        id: uuidv4(),
                    });
                });
            },
            prepare(parentId: string, description: string): ReduxAction<TodoItemType> {
                return { payload: { id: parentId, description, completed: false, children: [] } };
            },
        },
        toggleTodo: {
            reducer(state: TodoItemType[], action: PayloadAction<{ id: string }>): void {
                state = recursiveCheck(state, action, (todo: TodoItemType, action: any): void => {
                    todo.completed = !todo.completed;
                    toggleChildrenTodos(todo.children);
                });
            },
            prepare(id: string): ReduxAction<{ id: string }> {
                return { payload: { id } };
            },
        },
        changeTodo: {
            reducer(state: TodoItemType[], action: PayloadAction<{ id: string; description: string }>): void {
                state = recursiveCheck(state, action, (todo: TodoItemType, action: any): void => {
                    todo.description = action.payload.description;
                });
            },
            prepare(id: string, description: string): ReduxAction<{ id: string; description: string }> {
                return { payload: { id, description } };
            },
        },
    },
});

export const { addTodo, addSubTodo, toggleTodo, changeTodo } = todosSlice.actions;

export default todosSlice.reducer;
