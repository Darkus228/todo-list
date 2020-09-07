import React, { useState } from 'react';

const EditableInput = ({ defaultValue, onChangeInputValue, onSubmit, onClose, children }: any): JSX.Element => {
    const [isEditing, setIsEditing] = useState(false);
    const childrenProps = { isEditing, onSubmit, defaultValue, setIsEditing, onClose };

    return (
        <div className="text-center">
            {isEditing ? (
                <input
                    type="text"
                    className="text-xl text-center bg-white my-1 focus:outline-none focus:shadow-outline rounded-lg"
                    onChange={onChangeInputValue}
                    value={defaultValue}
                    autoFocus
                />
            ) : (
                <h2 className="text-xl">{defaultValue}</h2>
            )}
            {children(childrenProps)}
        </div>
    );
};

export default EditableInput;
