import { configureStore, createSlice, combineReducers, PayloadAction } from '@reduxjs/toolkit';
import { TodoItemType, ReduxAction } from '../utils/types';

let nextTodoId = 0;

function recursiveCheck(todos: TodoItemType[], action: any): TodoItemType[] {
    const { parentTodo, description, completed, children } = action.payload;
    todos.forEach((todo) => {
        if (JSON.stringify(todo) === JSON.stringify(parentTodo)) {
            todo?.children.push({
                id: todo.children.slice(-1)[0] ? todo.children.slice(-1)[0].id + 1 : 0,
                description,
                completed,
                children,
            });
        } else {
            recursiveCheck(todo.children, action);
        }
    });

    return todos;
}

const todosSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        addTodo: {
            reducer(state: TodoItemType[], action: PayloadAction<TodoItemType>): void {
                const { description } = action.payload;
                state.push({ id: 0, description, completed: false, children: [] });
            },
            prepare(description: string): ReduxAction<TodoItemType> {
                return { payload: { id: nextTodoId++, description, completed: false, children: [] } };
            },
        },
        addSubTodo: {
            reducer(state: TodoItemType[], action: PayloadAction<TodoItemType & { parentTodo: TodoItemType }>): void {
                state = recursiveCheck(state, action);
            },
            prepare(
                parentTodo: TodoItemType,
                description: string,
            ): ReduxAction<TodoItemType & { parentTodo: TodoItemType }> {
                return { payload: { parentTodo: parentTodo, id: 0, description, completed: false, children: [] } };
            },
        },
        toggleTodo: {
            reducer(state: TodoItemType[], action: PayloadAction<{ id: number }>): void {
                state.forEach((todo) => {
                    if (todo.id === action.payload.id) {
                        todo.completed = !todo.completed;
                    }
                });
            },
            prepare(id: number): ReduxAction<{ id: number }> {
                return { payload: { id } };
            },
        },
        changeTodo: {
            reducer(state: TodoItemType[], action: PayloadAction<{ id: number; description: string }>): void {
                const todo = state.find((todoItem) => todoItem.id === action.payload.id);

                if (todo) {
                    todo.description = action.payload.description;
                }
            },
            prepare(id: number, description: string): ReduxAction<{ id: number; description: string }> {
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
