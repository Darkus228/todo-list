import React, { useState } from "react";
import TodoItems from "./TodoItems";
import "../styles/main.css";

type TodoItems = Array<{
  id: number | undefined;
  title: string | undefined;
  description: string | undefined;
}>;

let id = 0;
const Main = () => {
  const [inputValue, setInputValue] = useState("");
  const [todoItems, setTodoItems] = useState<TodoItems>([]);

  const onSubmitTodoItem = (e: React.KeyboardEvent) => {
    const enterButton = 13;
    if (e.keyCode === enterButton) {
      setTodoItems([
        ...todoItems,
        { id: id++, title: inputValue, description: undefined },
      ]);
    }
  };

  return (
    <main className="main">
      <div className="welcome">
        <div className="welcome-bg"></div>
        <h1>Hello.</h1>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter a task..."
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={onSubmitTodoItem}
        />
      </div>
      <div>
        <TodoItems todoItems={todoItems} />
      </div>
    </main>
  );
};

export default Main;
