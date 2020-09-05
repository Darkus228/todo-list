import React from 'react';
import { TodoItemPopupProps } from '../../utils/types';

const TodoItemPopup: React.FC<TodoItemPopupProps> = ({ todoItemContent, onClose, isOpen }): JSX.Element => {
    return (
        <div></div>
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
