import React from 'react';

function AddBar(props) {
    return (
        <div className="add-container">
            <form>
                <label htmlFor="task">Task: </label>
                <input type="text" id="task"/>
                <input type="button" value="Submit"/>
            </form>
        </div>
    );
}

export default AddBar;