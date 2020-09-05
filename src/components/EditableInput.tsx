import React, { useRef, useEffect, useState } from 'react';

const EditableInput = ({ defaultValue, onEdit, onSubmit, children }: any): JSX.Element => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div>
            {isEditing ? <input type="text" onChange={onEdit} /> : <p>{defaultValue}</p>}
            {children()}
        </div>
        // <Box m={10}>
        //     <Input variant="outline" value={props.defaultValue} onChange={props.onEdit} />
        //     {props.children()}
        // </Box>
    );
};

export default EditableInput;
