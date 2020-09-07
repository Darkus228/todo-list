export interface ReduxAction<T extends {}> {
    type: string;
    payload: T;
}

export interface ReduxState {
    todos: TodoItemType[];
}

export type TodoItemType = {
    id: number;
    description: string;
    completed: boolean;
};

export type TodoItemProps = {
    todoItem: TodoItemType;
};

export type TodoItemPopupProps = {
    todo: TodoItemType;
    isOpen: boolean;
    onClose(): void;
};
