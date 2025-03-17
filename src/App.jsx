import { useRef, useState } from "react";
import "./index.css";

const arr = [
  { taskName: "Buy groceries", completed: false },
  { taskName: "Walk the dog", completed: true },
  { taskName: "Read a book", completed: false },
  { taskName: "Write some code", completed: true },
  { taskName: "Exercise", completed: false },
  { taskName: "Exercise", completed: false },
  { taskName: "Exercise", completed: false },
  { taskName: "Exercise", completed: false },
];

function App() {
  const [tasks, setTasks] = useState(arr);

  function handleAddTask(task) {
    setTasks((t) => [...t, task]);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-300">
      <MainContainer>
        <Header />
        <ListContainer>
          <List todoItems={tasks} />
        </ListContainer>
        <AddTask onAddTask={handleAddTask} />
      </MainContainer>
    </div>
  );
}

function MainContainer({ children }) {
  return (
    <div className="flex h-[42rem] max-h-screen w-2xl flex-col items-center bg-slate-400 shadow-sm">
      {children}
    </div>
  );
}

function Header() {
  return (
    <h1 className="text-md font-century w-full bg-slate-800 py-4 text-center font-bold text-white md:text-lg">
      ToDo List Vite/Tailwind 📝
    </h1>
  );
}

function ListContainer({ children }) {
  return <div className="flex w-full flex-col overflow-y-auto">{children}</div>;
}

function List({ todoItems }) {
  return todoItems.length > 0 ? (
    todoItems.map((item, i) => <TodoItem taskName={item.taskName} index={i} />)
  ) : (
    <p className="text-bold text-center">No items</p>
  );
}

function TodoItem({ taskName, index }) {
  return (
    <div
      className={`shadow-list-item flex max-w-full items-center justify-between bg-white px-2 py-4 starting:-translate-x-full`}
      style={{
        transitionDuration: `${index <= 8 ? (index + 1) * 200 + "ms" : "1500ms"}`,
      }}
    >
      {taskName}
    </div>
  );
}

function AddTask({ onAddTask }) {
  const inputField = useRef(null);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(2);

  function handleTask() {
    setIsSearching((s) => !s);
    if (inputField.current.value === "") return;
    const taskName = inputField.current.value;
    const priority = selectedPriority;

    onAddTask({ taskName, priority });
  }

  function handlePriority(e) {
    setSelectedPriority(e.target.value);
  }

  return (
    <div className="mt-auto flex min-h-20 w-full items-center justify-between gap-4 bg-slate-200 px-4 max-sm:gap-2">
      {isSearching ? (
        <>
          <input
            type="text"
            placeholder="Add new task..."
            className="flex-1 origin-right border-b px-4 outline-0 delay-250 duration-500 starting:scale-x-0"
            ref={inputField}
          />
          <select
            name="priority"
            id=""
            className="origin-right cursor-pointer outline-0 duration-500 starting:scale-x-0"
            value={selectedPriority}
            onChange={handlePriority}
          >
            <option value="1">1: High Priority</option>
            <option value="2">2: Medium Priority</option>
            <option value="3">3: Low Priority</option>
          </select>
        </>
      ) : (
        ""
      )}
      <button
        onClick={handleTask}
        className="ml-auto cursor-pointer rounded-md bg-slate-800 px-4 py-2 font-medium text-white shadow duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-95"
      >
        ADD TASK
      </button>
    </div>
  );
}

export default App;
