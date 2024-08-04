import { useState } from "react";
import "../styles/components/ToDo.css";
import ToDoInput from "./ToDoInput";
import ToDoList from "./ToDoList";

const MainPage = () => {
  const [addedToDo, setAddedToDo] = useState<boolean>(false);

  return (
    <section className="to-do-container flex flex-col items-center ">
      <ToDoInput setAddedToDo={setAddedToDo} addedToDo={addedToDo} />
      <article className="flex flex-col md:flex-row justify-between items-center mt-6">
        <ToDoList addedToDo={addedToDo} setAddedToDo={setAddedToDo} />
        {/* <NotToDoList /> */}
        <img
          className="size-24 rounded-full"
          src="../../../public/ROBOT.jpg"
        ></img>
      </article>
    </section>
  );
};

export default MainPage;
