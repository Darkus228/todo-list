import React, { useState, ChangeEvent } from 'react';
import { TodoItemPopupProps } from '../../utils/types';
import EditableInput from '../EditableInput';
import { changeTodo } from '../../redux/actions';
import { useDispatch } from 'react-redux';

const Buttons = ({ isEditing, onSubmit, onClose, setIsEditing }: any): JSX.Element => {
    const submit = (): void => {
        setIsEditing(!isEditing);
        onSubmit();
    };

    const close = (): void => {
        setIsEditing(!isEditing);
        onClose();
    };

    return isEditing ? (
        <div className="flex justify-center">
            <button className="bg-gray-400 hover:bg-gray-500 py-2 px-4" onClick={submit}>
                submit
            </button>
            <button className="bg-gray-400 hover:bg-gray-500 py-2 px-4" onClick={close}>
                close
            </button>
        </div>
    ) : (
        <div className="flex justify-center">
            <button className="bg-gray-400 hover:bg-gray-500 py-2 px-4" onClick={close}>
                edit
            </button>
        </div>
    );
};

const TodoItemPopup: React.FC<TodoItemPopupProps> = ({ todo, onClose, isOpen }): JSX.Element => {
    const [value, setValue] = useState(todo.description);
    const dispatch = useDispatch();

    const onSubmit = (): void => {
        dispatch(changeTodo(todo.id, value));
    };

    const onClosePopup = (): void => {
        setValue(todo.description);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex overflow-auto"
            style={{ background: 'rgba(0,0,0,0.4)', display: isOpen ? 'flex' : 'none' }}
        >
            <div className="relative m-auto p-8 w-full max-w-md max-h-md flex flex-col bg-white">
                <EditableInput
                    defaultValue={value}
                    onChangeInputValue={(e: any): void => setValue(e.target.value)}
                    onSubmit={onSubmit}
                    onClose={onClosePopup}
                >
                    {(props: any): JSX.Element => <Buttons {...props} />}
                </EditableInput>
                <span className="absolute p-4">
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
            </div>
        </div>
    );
};

export default TodoItemPopup;
