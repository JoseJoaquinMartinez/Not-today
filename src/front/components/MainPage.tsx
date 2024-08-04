import { useState } from "react";
import "../styles/components/ToDo.css";
import ToDoInput from "./ToDoInput";
import ToDoList from "./ToDoList";

const MainPage = () => {
  const [addedToDo, setAddedToDo] = useState<boolean>(false);

  return (
    <section className="to-do-container flex flex-col items-center ">
      <ToDoInput setAddedToDo={setAddedToDo} addedToDo={addedToDo} />
      <article>
        <ToDoList addedToDo={addedToDo} setAddedToDo={setAddedToDo} />
        {/* <NotToDoList /> */}
      </article>
      <img src="../../../public/ROBOT.jpg"></img>
    </section>
  );
};

export default MainPage;
