import "./index.css";

const arr = [
  { task: "Buy groceries", completed: false },
  { task: "Walk the dog", completed: true },
  { task: "Read a book", completed: false },
  { task: "Write some code", completed: true },
  { task: "Exercise", completed: false },
];

function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-300 p-4">
      <MainContainer>
        <Header />
        <ListContainer>
          <List todoItems={arr} />
        </ListContainer>
        <AddTask />
      </MainContainer>
    </div>
  );
}

function MainContainer({ children }) {
  return (
    <div className="flex aspect-square w-2xl flex-col items-center bg-slate-400 shadow-sm">
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
  return (
    <div className="flex w-full flex-col overflow-y-auto bg-white">
      {children}
    </div>
  );
}

function List({ todoItems }) {
  return todoItems.length > 0 ? (
    todoItems.map((item) => <TodoItem task={item.task} />)
  ) : (
    <p className="text-bold text-center">No items</p>
  );
}

function TodoItem({ task }) {
  return (
    <div className="flex items-center justify-between p-2 shadow-md">
      {task}
    </div>
  );
}

function AddTask() {
  return (
    <div className="mt-auto flex min-h-20 w-full items-center justify-between gap-4 bg-slate-300 px-4">
      <input
        type="text"
        placeholder="Add new task..."
        className="flex-1 border-b px-4 outline-0"
      />
      <button className="cursor-pointer rounded-md bg-slate-800 px-4 py-2 font-medium text-white shadow duration-200 hover:-translate-y-0.5 hover:shadow-md">
        ADD TASK
      </button>
    </div>
  );
}

export default App;
