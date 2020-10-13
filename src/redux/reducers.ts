import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { TodoItemType, ReduxAction } from '../utils/types';

function changeTodosState(todos: TodoItemType[], action: any, callback: Function): void {
    const { id } = action.payload;

    todos.forEach((todo) => {
        if (todo.id === id) {
            callback(todo);
        } else {
            changeTodosState(todo.children, action, callback);
        }
    });
}

function toggleChildrenTodos(isParentTodoCompleted: boolean, childrenTodos: TodoItemType[]): void {
    childrenTodos.forEach((todo) => {
        if (todo.children.length > 0) {
            toggleChildrenTodos(isParentTodoCompleted, todo.children);
        }

        if (isParentTodoCompleted) {
            todo.completed = true;
        } 
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
                changeTodosState(state, action, (todo: TodoItemType): void => {
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

                changeTodosState(state, action, (todo: TodoItemType) => {
                    todo.completed = !todo.completed;
                    toggleChildrenTodos(todo.completed, todo.children);
 
                });
                // state.forEach((todo): void => {
                //     if(todo.id === action.payload.id) {
                //    }
                // });
           },
            prepare(id: string): ReduxAction<{ id: string }> {
                return { payload: { id } };
            },
        },
        changeTodo: {
            reducer(state: TodoItemType[], action: PayloadAction<{ id: string; description: string }>): void {
                changeTodosState(state, action, (todo: TodoItemType): void => {
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
