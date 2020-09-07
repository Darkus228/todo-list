import React, { useState } from 'react';

const EditableInput = ({ defaultValue, onChangeInputValue, onSubmit, onClose, children }: any): JSX.Element => {
    const [isEditing, setIsEditing] = useState(false);
    const childrenProps = { isEditing, onSubmit, defaultValue, setIsEditing, onClose };

    return (
        <div className="text-center">
            {isEditing ? (
                <input type="text" className="text-xl text-center" onChange={onChangeInputValue} value={defaultValue} />
            ) : (
                <h2 className="text-xl">{defaultValue}</h2>
            )}
            {children(childrenProps)}
        </div>
    );
};

export default EditableInput;
