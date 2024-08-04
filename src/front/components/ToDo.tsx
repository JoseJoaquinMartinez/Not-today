import type { ToDoType } from "./types.d.ts";

const ToDo = ({ id, title, completed }: ToDoType) => {
  return (
    <>
      <div key={id}>
        <h1>{title}</h1>
        <button>{completed}</button>
      </div>
    </>
  );
};

export default ToDo;
