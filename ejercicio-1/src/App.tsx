import React, { useState } from "react";
import "./App.css";

interface TodoItem {
  id: number;
  text: string;
}

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputText.trim() === "") return;

    const newTodo: TodoItem = {
      id: Date.now(),
      text: inputText,
    };

    setTodoList([...todoList, newTodo]);
    setInputText("");
  };

  const handleDeleteTodo = (id: number) => {
    const updatedList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedList);
  };

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter a new todo"
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id} onClick={() => handleDeleteTodo(todo.id)}>
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
