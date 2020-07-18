import React from 'react';
import AddTodoItemBar from './AddTodoItemBar';
import TodoTable from './TodoTable';

function FilterableTodoTable() {
    return (
        <div className="filterable-todo-table">
            <AddTodoItemBar/>
            <TodoTable/>
        </div>
    );
}

export default FilterableTodoTable;