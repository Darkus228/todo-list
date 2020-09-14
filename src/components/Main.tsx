import React, { useState } from 'react';
import {Provider, shallowEqual, useDispatch, useSelector} from 'react-redux';
import { addTodo } from '../redux/reducers';
import TodoItems from './todolist/TodoItems';
import { ReduxState, TodoItemType } from '../utils/types';
import gaben from "../assets/images/gaben.jpeg";

const Main = (): JSX.Element => {
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();
    const todoItems = useSelector(({ todos }: ReduxState): TodoItemType[] => todos, shallowEqual);

    const onAddTodoItem: (e: React.KeyboardEvent) => void = (e) => {
        if (e.key === 'Enter') {
            if (inputValue.trim() === '') return;

            dispatch(addTodo(inputValue));

            setInputValue('');
        }
    };

    return (
        <div className="flex justify-center py-4 px-2 sm:mx-0 bg-gaben">
            <div className="w-full sm:w-1/2 max-h-screen overflow-y-auto">
                <input
                    placeholder="Enter a task..."
                    onChange={(event: React.ChangeEvent<HTMLInputElement>): void => setInputValue(event.target.value)}
                    onKeyDown={onAddTodoItem}
                    value={inputValue}
                    className="bg-white my-1 focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                    autoFocus
                />

                <h1 className="font-bold text-2xl text-green text-white">Today <span className="text-sm">{new Date().toDateString()}</span></h1>
                <TodoItems todoItems={todoItems} />
            </div>
        </div>
    );
};

export default Main;
