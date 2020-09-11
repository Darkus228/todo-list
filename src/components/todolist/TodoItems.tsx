import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TodoItemType } from '../../utils/types';
import { toggleTodo } from '../../redux/actions';
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
        <li className="list-none bg-white w-full my-2">
            <input type="checkbox" onChange={onToggleTodo} />
            <button className="ml-2" onClick={onChangeAlertState}>
                <p className="text-gray-600">{todoItem.description}</p>
            </button>
            <TodoItemPopup todo={todoItem} isOpen={isOpenAlert} onClose={onChangeAlertState}/>
            {todoItem.children.length > 0 && <TodoItems todoItems={todoItem.children}/>}
        </li>

);
};

const TodoItems = ({ todoItems }: { todoItems: TodoItemType[] }): JSX.Element => {
    const renderedTodoItems = todoItems.map((todo) => <TodoItem todoItem={todo} key={todo.id} />);

    return <ul className="ml-5">{renderedTodoItems}</ul>;
};

export default TodoItems;
