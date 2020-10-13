import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../redux/reducers';
import TodoItems from './todolist/TodoItems';
import { ReduxState, TodoItemType } from '../utils/types';

const Main = (): JSX.Element => {
    const [inputValue, setInputValue] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const dispatch = useDispatch();
    const todoItems = useSelector(({ todos }: ReduxState): TodoItemType[] => todos, shallowEqual);

    const onAddTodoItem: (e: React.KeyboardEvent) => void = (e) => {
        if (e.key === 'Enter') {
            if (inputValue.trim() === '') return;

            dispatch(addTodo(inputValue));

            setInputValue('');
        }
    };

    const onSearchTodo: (e: React.KeyboardEvent) => void = (e) => {
        if (e.key === 'Enter') {
            
        }

    }

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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>): void => setSearchValue(event.target.value)}
                    onKeyDown={onSearchTodo}
                    type="text" 
                    className="transition duration-500 ease-in-out transform focus:-translate-y-1 bg-white ml-2 my-1 focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-1/3 appearance-none"
                />
 
                </div>
               <h1 className="font-bold text-2xl">
                    Today <span className="text-sm">{new Date().toDateString()}</span>
                </h1>
                <TodoItems todoItems={todoItems} />
            </div>
        </div>
    );
};

export default Main;
