import React, { useState } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../redux/todoSlice';
import { setSearchValue } from '../redux/searchSlice';
import { State, TodoItemType, VisibilityFilter } from '../utils/types';
import { changeTodosState } from '../utils/helpers';
import FilterLink from './filter/FilterLink';
import TodoItems from './todolist/TodoItems';

const selectSearchValue = (state: State): string => state.search;
const selectTodos = (state: State): TodoItemType[] => state.todos;
const selectVisibilityFilter = (state: State): VisibilityFilter => state.visibilityFilter;

const setSearchedTodos = createSelector(
    selectTodos,
    selectSearchValue,
    (todos, searchValue): TodoItemType[] => {
        const searchedTodos: TodoItemType[] = [];
        changeTodosState(todos, (todo): boolean => {
            if (todo.description.includes(searchValue)) {
                if (todo.children.length > 0 || todo.children.length === 0) {
                    searchedTodos.push(todo);
                    return true;
                }
                return false;
            }
            return false;
        });
        return searchedTodos;
    }
);

const setVisibleTodos = createSelector(
    setSearchedTodos,
    selectVisibilityFilter,
    (todos: TodoItemType[], filter: VisibilityFilter): TodoItemType[] => {
        switch(filter) {
            case VisibilityFilter.ALL:
                return todos;
            case VisibilityFilter.COMPLETED:
                const completedTodos: TodoItemType[] = [];
                changeTodosState(todos, (todo: TodoItemType): boolean => {
                    if ((todo.completed && todo.children.length > 0) || (todo.completed && todo.children.length == 0)) {
                        completedTodos.push(todo);
                        return true;
                    }
                    return false;
                })
                return completedTodos;
            case VisibilityFilter.ACTIVE:
                const activeTodos: TodoItemType[] = []; 
                changeTodosState(todos, (todo: TodoItemType): boolean => {
                    if ((!todo.completed && todo.children.length > 0) || (!todo.completed && todo.children.length == 0)) {
                        activeTodos.push(todo);
                        return true;
                    }
                    return false;
                })
                return activeTodos;
        }
    },
);

const Main = (): JSX.Element => {
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();
    const todoItems = setVisibleTodos(useSelector((state: State) => state));

    const onAddTodoItem: (e: React.KeyboardEvent) => void = (e) => {
        if (e.key === 'Enter') {
            if (inputValue.trim() === '') return;

            dispatch(addTodo(inputValue));
            setInputValue('');
        }
    };

        return (
        <div className="flex justify-center my-4 mx-2 sm:mx-0">
            <div className="w-full sm:w-1/2">
                <div className="flex">
                <input
                    placeholder="Enter a task..."
                    onChange={(event: React.ChangeEvent<HTMLInputElement>): void => setInputValue(event.target.value)}
                    onKeyDown={onAddTodoItem}
                    value={inputValue}
                    className="transition duration-500 ease-in-out transform focus:-translate-y-1 bg-white my-1 focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none"
                    autoFocus
                />
                <input 
                    placeholder="Looking for task..."
                    onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                        dispatch(setSearchValue(event.target.value));
                    }
                }
                    type="text" 
                    className="transition duration-500 ease-in-out transform focus:-translate-y-1 bg-white ml-2 my-1 focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-1/3 appearance-none"
                />
 
                </div>
                <h1 className="font-bold text-2xl">
                    Today <span className="text-sm">{new Date().toDateString()}</span>
                </h1>
                <FilterLink filter={VisibilityFilter.ALL}>
                    ALL
                </FilterLink>
                <FilterLink filter={VisibilityFilter.ACTIVE}>
                    ACTIVE
                </FilterLink>
                <FilterLink filter={VisibilityFilter.COMPLETED}>
                    COMPLETED
                </FilterLink>
               <TodoItems todoItems={todoItems} />
            </div>
        </div>
    );
};

export default Main;
