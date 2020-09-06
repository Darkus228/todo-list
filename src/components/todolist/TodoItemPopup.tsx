import React, {useState} from 'react';
import { TodoItemPopupProps } from '../../utils/types';
import EditableInput from '../EditableInput';
import { changeTodo } from '../../redux/actions';
import {useDispatch} from "react-redux";

const Buttons = ({ isEditing, onSubmit, setIsEditing }: any): JSX.Element => {
    const submit = (): void => {
        setIsEditing(!isEditing);
        onSubmit();
    };

    const close = (): void => {
        setIsEditing(!isEditing);
    };

    return isEditing ? (
        <div className="flex justify-center">
            <button className="bg-gray-400 hover:bg-gray-500 py-2 px-4" onClick={submit}>
                edit
            </button>
            <button className="bg-gray-400 hover:bg-gray-500 py-2 px-4" onClick={close}>
                close
            </button>
        </div>
    ) : (
        <div>
            <button className="bg-gray-400 hover:bg-gray-500 py-2 px-4" onClick={close}>
                edit
            </button>
        </div>
    );
};


const TodoItemPopup: React.FC<TodoItemPopupProps> = ({ todoItemContent, onClose, isOpen }): JSX.Element => {
    const [value, setValue] = useState(todoItemContent);
    const dispatch = useDispatch();

    return (isOpen ? (
        <div className="fixed inset-0 z-50 flex overflow-auto" style={{background: 'rgba(0,0,0,0.4)'}}>
            <div className="relative m-auto p-8 w-full max-w-md max-h-md flex flex-col bg-white">
                <EditableInput
                    defaultValue={value}
                    onChangeInputValue={(e: any): void => setValue(e.target.value)}
                >
                    {(props: any): JSX.Element => <Buttons {...props}/>}
                </EditableInput>
                <h2 className="text-xl">{todoItemContent}</h2>
                <span className="absolute pin-t pin-b pin-r p-4">
                    <button onClick={onClose}>
                    <svg className="h-12 w-12 fill-current text-grey hover:text-grey-darkest" role="button"
                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path
                        d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                    </button>
                </span>
            </div>
        </div>
        )
        : (
            <div></div>
        )

        // <Modal isOpen={isOpen} onClose={onClose}>
        //     <ModalOverlay />
        //     <ModalContent>
        //         <ModalHeader>{todoItemContent}</ModalHeader>
        //         <ModalCloseButton />
        //         <ModalBody>
        //             <Text>Actions</Text>
        //             <Button variantColor="teal" variant="outline" mt={10} mb={10}>
        //                 Add sub-task
        //             </Button>
        //         </ModalBody>
        //     </ModalContent>
        // </Modal>
    );
};

export default TodoItemPopup;
