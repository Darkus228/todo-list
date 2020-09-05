export interface ReduxAction<T> {
    type: string;
    payload: T;
}

export interface ReduxState {
    todos: TodoItemType[];
}

export type TodoItemType = {
    id: number;
    description?: string;
    completed?: boolean;
};

export type TodoItemProps = {
    todoItem: TodoItemType;
    key?: number;
};

export type TodoItemPopupProps = {
    todoItemContent: string;
    isOpen: boolean;
    onClose(): void;
};
