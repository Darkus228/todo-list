import React, { ChangeEvent, useState } from 'react';
import { changeTodo, addSubTodo } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { FaEdit, FaCheck } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import TodoItems from './TodoItems';
import { TodoItemPopupProps } from '../../utils/types';
import EditableInput from '../EditableInput';

const EditableControl = ({ isEditing, onSubmit, onClose, setIsEditing }: any): JSX.Element => {
    const onSubmitInputValue = (): void => {
        setIsEditing(!isEditing);
        onSubmit();
    };

    const onCancelInputValue = (): void => {
        setIsEditing(!isEditing);
        onClose();
    };

    return isEditing ? (
        <div className="flex justify-center">
            <button className="bg-gray-400 hover:bg-gray-500 py-2 px-4 rounded-l" onClick={onSubmitInputValue}>
                <FaCheck />
            </button>
            <button className="bg-gray-400 hover:bg-gray-500 py-2 px-4 rounded-r" onClick={onCancelInputValue}>
                <ImCross />
            </button>
        </div>
    ) : (
        <div className="flex justify-center">
            <button className="bg-gray-400 hover:bg-gray-500 py-2 px-4" onClick={(): void => setIsEditing(!isEditing)}>
                <FaEdit />
            </button>
        </div>
    );
};

const TodoItemPopup: React.FC<TodoItemPopupProps> = ({ todo, onClose, isOpen }): JSX.Element => {
    const [todoValue, setTodoValue] = useState(todo.description);
    const [subTodoValue, setSubTodoValue] = useState('');
    const [edit, setEdit] = useState(false);
    const dispatch = useDispatch();

    const onSubmit = (): void => {
        console.log(todo);
        dispatch(changeTodo(todo.id, todoValue));
    };

    const onChangeEditState = (): void => {
        setEdit(!edit);
    };

    const onSubmitAddSubTodo = (e: React.KeyboardEvent): void => {
        if (e.key === 'Enter' && subTodoValue.trim()) {
            dispatch(addSubTodo(todo.id, subTodoValue));

            setEdit(!edit);
        }
    };

    const onCloseInput = (): void => {
        setTodoValue(todo.description);
    };

    // FIXME: Get rid of background as property of an object
    // FIXME: Change all types of any on something more meaningful
    return (
        <div
            className="fixed inset-0 z-50 flex overflow-auto"
            style={{ background: 'rgba(0,0,0,0.4)', display: isOpen ? 'flex' : 'none' }}
        >
            <div className="relative m-auto p-8 w-full max-w-md max-h-md flex flex-col bg-white">
                <span className="absolute top-0 right-0 p-4">
                    <button onClick={onClose}>
                        <svg
                            className="h-12 w-12 fill-current text-grey hover:text-grey-darkest"
                            role="button"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <title>Close</title>
                            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                        </svg>
                    </button>
                </span>

                <EditableInput
                    defaultValue={todoValue}
                    onChangeInputValue={(e: ChangeEvent<HTMLInputElement>): void => setTodoValue(e.target.value)}
                    onSubmit={onSubmit}
                    onClose={onCloseInput}
                >
                    {(props: any): JSX.Element => <EditableControl {...props} />}
                </EditableInput>
                <hr className="my-5" />
                {/* TODO: change all the handlers of editable input below to handling adding sub-todo of existent todo  */}
                {/* TODO: add drawing all children's todos of the current todo parent */}
                <TodoItems todoItems={todo.children} />
                {edit ? (
                    <input
                        type="text"
                        onChange={(e): void => setSubTodoValue(e.target.value)}
                        onKeyDown={onSubmitAddSubTodo}
                        autoFocus
                        onBlur={onChangeEditState}
                    />
                ) : (
                    <button
                        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                        onClick={onChangeEditState}
                    >
                        Add sub-task
                    </button>
                )}
            </div>
        </div>
    );
};

export default TodoItemPopup;
