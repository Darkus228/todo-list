import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { TodoItemsProps } from '../../utils/types';
import { toggleTodo, removeTodo } from '../../redux/todoSlice';
import { TodoItemProps } from '../../utils/types';
import TodoItemPopup from './TodoItemPopup';

const TodoItem: React.FC<TodoItemProps> = ({ todoItem }): JSX.Element => {
    const [isOpenAlert, setIsOpenAlert] = useState(false);
    const dispatch = useDispatch();

    const onToggleTodo = (): void => {
        dispatch(toggleTodo(todoItem.id));
    };

    const onRemoveTodo = (): void => {
        dispatch(removeTodo(todoItem.id));
    }

    const onChangeAlertState = (): void => {
        setIsOpenAlert(!isOpenAlert);
    };

    return (
        <li className="list-none w-full my-2">
            <div className="flex items-center">
                <input type="checkbox" onChange={onToggleTodo} checked={todoItem.completed} />
                <button className="ml-2" onClick={onChangeAlertState}>
                    <p className="">{todoItem.description}</p>
                </button>
                <button className="ml-auto" onClick={onRemoveTodo}><FaTimes/></button>
                <TodoItemPopup todo={todoItem} isOpen={isOpenAlert} onClose={onChangeAlertState} />
            </div>
            {todoItem.children.length > 0 && <TodoItems todoItems={todoItem.children} />}
        </li>
    );
};

const TodoItems: React.FC<TodoItemsProps> = ({ todoItems }): JSX.Element => {
    const renderedTodoItems = todoItems.map((todo) => <TodoItem todoItem={todo} key={todo.id} />);

    return renderedTodoItems.length > 0 ? <ul className="ml-2">{renderedTodoItems}</ul> : <h3 className="my-2">All tasks has been done for today :)</h3>;
};

export default TodoItems;
