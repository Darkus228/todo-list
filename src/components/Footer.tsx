import React, { useState } from 'react';
import EditableInput from './EditableInput';
import correct from '../assets/images/correct.svg';
import closeIcon from '../assets/images/close.svg';

const Buttons = ({ isEditing, onSubmit, setIsEditing }: any): JSX.Element => {
    const submit = (): void => {
        setIsEditing(!isEditing);
        onSubmit();
    };

    const close = (): void => {
        setIsEditing(!isEditing);
    };

    const output = isEditing ? (
        <div className="flex justify-center">
            <button className="bg-gray-400 hover:bg-gray-500 py-2 px-4" onClick={submit}>
                <svg height="329pt" viewBox="0 0 329.26933 329" width="329pt" xmlns="http://www.w3.org/2000/svg">
                    <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
                </svg>
            </button>
            <button className="bg-gray-400 hover:bg-gray-500 py-2 px-4" onClick={close}>
                {closeIcon}
            </button>
        </div>
    ) : (
        <div>
            <button className="bg-gray-400 hover:bg-gray-500 py-2 px-4" onClick={close}>
                edit
            </button>
        </div>
    );

    return output;
};

const Footer = (): JSX.Element => {
    const [value, setValue] = useState('to do sm');

    return (
        <footer>
            <EditableInput
                defaultValue={value}
                onChangeInputValue={(e: any): void => setValue(e.target.value)}
                onSubmit={(): void => console.log('Submit')}
            >
                {(props: any): JSX.Element => <Buttons {...props} />}
            </EditableInput>
        </footer>
    );
};

export default Footer;
