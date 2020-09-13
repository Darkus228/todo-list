export interface ReduxAction<T extends {}> {
    payload: T;
}

export interface ReduxState {
    todos: TodoItemType[];
}

export type TodoItemType = {
    id: string;
    description: string;
    completed: boolean;
    children: TodoItemType[];
};

export type TodoItemsProps = {
    todoItems: TodoItemType[];
};

export type TodoItemProps = {
    todoItem: TodoItemType;
};

export type TodoItemPopupProps = {
    todo: TodoItemType;
    isOpen: boolean;
    onClose(): void;
};
