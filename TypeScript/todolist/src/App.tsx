import React, { useState } from "react";
import "./App.css";

function App(): React.ReactElement {
  type TodoType = { id: number; checked: boolean; value: string };
  const [todoList, setTodoList] = useState<TodoType[]>([]);
  const [checked, setChecked] = useState(new Set());
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue === "") return;
    if (todoList.length < 6) {
      setTodoList((curr) => {
        return [
          ...curr,
          {
            id: new Date().getTime(),
            checked: false,
            value: inputValue,
          },
        ];
      });
    } else {
      return alert("삭제 후 입력해주세요.");
    }
    setInputValue("");
  };

  const handleCompleteClick = ({target}: React.ChangeEvent<HTMLInputElement>, index:number) => {
    setIsChecked(!isChecked);
    onChecked(index, target.value, target.checked);
  };

  const onChecked = (index:number, id:string, isChecked:boolean) => {
    if (isChecked) {
      checked.add(id);
      setChecked(checked);
      setTodoList((curr) => {
        const newList = [...curr];
        newList[index].checked = true;
        return newList;
      });
    } else if (!isChecked && checked.has(id)) {
      checked.delete(id);
      setChecked(checked);
      setTodoList((curr) => {
        const newList = [...curr];
        newList[index].checked = false;
        return newList;
      });
    }
    return checked;
  };

  const handleRemoveClick = (index:number) => {
    setTodoList((curr) => {
      const newList = [...curr];
      newList.splice(index, 1);
      return newList;
    });
  };

  return (
    <div id="container">
      <div id="wrap">
        <p id="title">TODO LIST</p>
        <form id="create" onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" id="btn">
            ADD
          </button>
        </form>
        <ol id="todo-list">
          {todoList.map((item, index) => (
            <li className={item.checked ? "completed" : ""}>
              <input
                className="complete"
                type="checkbox"
                value={item.id}
                onChange={(e) => handleCompleteClick(e, index)}
              />
              <span>{item.value}</span>
              <button
                className="remove"
                onClick={() => handleRemoveClick(index)}
              >
                ✖
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default App;
