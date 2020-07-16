import React from 'react';
import AddTodoItemBar from './AddTodoItemBar';
import TodoTable from './TodoTable';

function FilterableTodoTable(props) {
    return (
        <div className="filterable-todo-table">
            <AddTodoItemBar/>
            <TodoTable
                todoItems={props.todoItems}
                deleteTask={props.deleteTask}
                changeStatus={props.changeStatus}
                sortIcon={props.sortIcon}
                sortIcons={props.sortIcons}
                changeSortIcon={props.changeSortIcon}
            />
        </div>
    );
}

export default FilterableTodoTable;