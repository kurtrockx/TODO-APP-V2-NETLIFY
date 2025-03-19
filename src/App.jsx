import { useRef, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import "./index.css";

function App() {
  const [tasks, setTasks] = useLocalStorage("tasks");

  function handleAddTask(task) {
    setTasks((t) => [...t, task]);
  }

  function handleDeleteTask(taskId) {
    setTasks((tasks) => tasks.filter((task) => task.id !== taskId));
  }

  return (
    <div className="flex min-h-screen items-center justify-center max-sm:min-h-auto">
      <MainContainer>
        <Header />
        <ListContainer>
          <List todoItems={tasks} onDeleteTask={handleDeleteTask} />
        </ListContainer>
        <AddTask onAddTask={handleAddTask} />
      </MainContainer>
    </div>
  );
}

function MainContainer({ children }) {
  return (
    <div className="flex h-[42rem] max-h-screen max-sm:h-[100dvh] w-2xl flex-col items-center bg-slate-500 shadow-sm">
      {children}
    </div>
  );
}

function Header() {
  return (
    <h1 className="text-md font-century w-full bg-slate-800 py-4 text-center font-bold text-white">
      ToDo List Vite/Tailwind 📝
    </h1>
  );
}

function ListContainer({ children }) {
  return (
    <div className="flex w-full flex-1 flex-col overflow-y-auto">
      {children}
    </div>
  );
}

function List({ todoItems, onDeleteTask }) {
  return todoItems.length > 0 ? (
    todoItems.map((item, i, arr) => (
      <TodoItem
        taskName={item.taskName}
        index={i}
        id={item.id}
        key={item.id}
        arr={arr}
        priority={item.priority}
        onDeleteTask={onDeleteTask}
      />
    ))
  ) : (
    <div className="h-full flex-1 content-center">
      <p className="text-bold text-center text-2xl text-white">
        No items in your list yet 😁
      </p>
    </div>
  );
}

function TodoItem({ taskName, id, priority, index, arr, onDeleteTask }) {
  return (
    <div
      className={`max-w-full bg-white shadow starting:-translate-x-full`}
      style={{
        transitionDuration: `${index <= 8 ? (index + 1.25) * 150 + "ms" : "1500ms"}`,
        zIndex: arr.length - index,
      }}
    >
      <div className="flex w-full origin-top items-center justify-between px-2 py-4 duration-200 ease-linear hover:text-lg max-sm:py-px max-sm:text-sm max-sm:hover:text-[1rem]">
        <p className="font-medium">
          {priority === 1 && "🔴"}
          {priority === 2 && "🟡"}
          {priority === 3 && "🟢"}
          {taskName}
        </p>
        <button
          onClick={() => onDeleteTask(id)}
          className="cursor-pointer p-2 text-2xl font-bold text-red-800"
        >
          &times;
        </button>
      </div>
    </div>
  );
}

function AddTask({ onAddTask }) {
  const inputField = useRef(null);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(2);

  function handleTask() {
    setIsSearching((s) => !s);
    if (!isSearching) return;
    if (inputField.current.value.trim() === "") return;

    const taskName = inputField.current.value;
    const priority = +selectedPriority;
    const id = Math.trunc(Math.random() * 900000) + 100000;

    onAddTask({ taskName, priority, id });
  }

  function handlePriority(e) {
    setSelectedPriority(e.target.value);
  }

  return (
    <div className="mt-auto flex min-h-20 w-full items-center justify-center gap-4 bg-slate-200 px-4 py-2 max-sm:min-h-12 max-sm:flex-col max-sm:gap-2 max-sm:px-px">
      {isSearching ? (
        <div className="flex flex-1">
          <input
            type="text"
            placeholder="Add new task..."
            className="flex-1 origin-right border-b px-4 outline-0 delay-250 duration-500 max-sm:px-2 max-sm:text-sm starting:scale-x-0"
            ref={inputField}
          />
          <select
            name="priority"
            id=""
            className="origin-right cursor-pointer outline-0 duration-500 max-sm:text-sm starting:scale-x-0"
            value={selectedPriority}
            onChange={handlePriority}
          >
            <option value="1">🔴 High Priority</option>
            <option value="2">🟡 Medium Priority</option>
            <option value="3">🟢 Low Priority</option>
          </select>
        </div>
      ) : (
        ""
      )}
      <button
        onClick={handleTask}
        className="ml-auto cursor-pointer rounded-md bg-slate-800 px-4 py-2 font-medium text-white shadow duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-95 max-sm:mx-auto max-sm:text-sm"
      >
        ADD TASK
      </button>
    </div>
  );
}

export default App;
