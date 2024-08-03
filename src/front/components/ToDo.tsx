import type { ToDoProps } from "./types.d.ts";

const ToDo = ({ id, title, completed }: ToDoProps) => {
  return (
    <div key={id}>
      <h1>{title}</h1>
      <button>{completed}</button>
    </div>
  );
};

export default ToDo;
