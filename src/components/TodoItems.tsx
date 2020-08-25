import * as React from "react";
type Props = {
  todoItems: Array<{
    id: number | undefined;
    title: string | undefined;
    description: string | undefined;
  }> | undefined;
};
const TodoItems: React.FC<Props> = (props) => {
  const renderedTodoItems = props.todoItems?.map((todo) => (
    <div>
      <h3>{todo?.title}</h3>
      <p>{todo?.description}</p>
    </div>
  ));
  return <div>{renderedTodoItems}</div>;
};

export default TodoItems;
