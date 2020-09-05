import React, { useState } from 'react';

const EditableInput = ({ defaultValue, onChangeInputValue, onSubmit, children }: any): JSX.Element => {
    const [isEditing, setIsEditing] = useState(false);
    const childrenProps = { isEditing, onSubmit, defaultValue, setIsEditing };

    return (
        <div className="text-center">
            {isEditing ? <input type="text" onChange={onChangeInputValue} value={defaultValue}/> : <p>{defaultValue}</p>}
            {children(childrenProps)}
        </div>
    );
};

export default EditableInput;
