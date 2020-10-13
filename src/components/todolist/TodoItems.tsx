import React, { useState } from 'react';
import { FaArrowDown, FaArrowRight } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { TodoItemsProps } from '../../utils/types';
import { toggleTodo } from '../../redux/reducers';
import { TodoItemProps } from '../../utils/types';
import TodoItemPopup from './TodoItemPopup';

const TodoItem: React.FC<TodoItemProps> = ({ todoItem }): JSX.Element => {
    const [isOpenAlert, setIsOpenAlert] = useState(false);
    const dispatch = useDispatch();

    const onToggleTodo = (): void => {
        dispatch(toggleTodo(todoItem.id));
    };

    const onChangeAlertState = (): void => {
        setIsOpenAlert(!isOpenAlert);
    };

    return (
        <li className="list-none w-full my-2">
            <input type="checkbox" onChange={onToggleTodo} checked={todoItem.completed} />
            <button className="ml-2" onClick={onChangeAlertState}>
                <p className="text-gray-600">{todoItem.description}</p>
            </button>
            <TodoItemPopup todo={todoItem} isOpen={isOpenAlert} onClose={onChangeAlertState} />

            {todoItem.children.length > 0 && <TodoItems todoItems={todoItem.children} />}
        </li>
    );
};

const TodoItems: React.FC<TodoItemsProps> = ({ todoItems }): JSX.Element => {
    const renderedTodoItems = todoItems.map((todo) => <TodoItem todoItem={todo} key={todo.id} />);

    return renderedTodoItems.length > 0 ? <ul className="ml-5">{renderedTodoItems}</ul> : <h3 className="my-2">All tasks has been done for today :)</h3>;
};

export default TodoItems;
