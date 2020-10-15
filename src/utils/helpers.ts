import {PayloadAction } from '@reduxjs/toolkit';
import { TodoItemType } from './types';

function changeTodosState(todos: TodoItemType[], callback: (todo: TodoItemType) => any): void {
    if (todos == null) return;

    todos.forEach((todo) => {
        const resCallback = callback(todo);
        if (typeof resCallback === 'boolean') {
            if (resCallback) {
                return;
            }
        }
        changeTodosState(todo.children, callback);
    });
}

function removeTodoItems(todos: TodoItemType[], action: PayloadAction<any>): void  {
    const { id } = action.payload;
    const index = todos.findIndex((todo) => todo.id === id);

    if (index != -1) {
        todos.splice(index, 1);
    } else {
        todos.forEach((todo) => {
            if (todo.children.length > 0) {
                removeTodoItems(todo.children, action);
            }
        })
    }
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

// function filterTodos1(j)

// function filterTodos(todos: TodoItemType[]): TodoItemType[] {
//     const filteredTodos: any[] = [];
//     return (): any[] => {
//         todos.forEach((todo) => {
//             if (todo.completed) {
//                 filteredTodos.push(todo);
//             }
//         })
//         return filteredTodos;
//     };
// };

export { changeTodosState, removeTodoItems, toggleChildrenTodos };
