import React, { useState } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { TodoItemType, ReduxState } from '../../utils/types';
import { toggleTodo } from '../../redux/actions';
import { TodoItemProps } from '../../utils/types';

const TodoItem: React.FC<TodoItemProps> = ({ todoItem }): JSX.Element => {
    const [isOpenAlert, setIsOpenAlert] = useState(false);
    const dispatch = useDispatch();

    const onToggleTodo = (): void => {
        dispatch(toggleTodo(todoItem.id));
        setIsOpenAlert(!isOpenAlert);
    };

    return (
        <li className="list-none bg-white w-full my-2">
            <input type="checkbox" onChange={onToggleTodo} />
            <button className="ml-2">
                <p className="text-gray-600">{todoItem.description}</p>
            </button>
        </li>
    );
};

const TodoItems = (): JSX.Element => {
    const todoItems: TodoItemType[] = useSelector(({ todos }: ReduxState): TodoItemType[] => todos, shallowEqual);

    const renderedTodoItems = todoItems.map((todo, key) => <TodoItem todoItem={todo} key={key} />);

    return <ul>{renderedTodoItems}</ul>;
};

export default TodoItems;
