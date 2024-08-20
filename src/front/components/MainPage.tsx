import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/components/ToDo.css";
import ToDoInput from "./ToDoInput";
import ToDoList from "./ToDoList";

const MainPage = () => {
  const navigate = useNavigate();
  const [addedToDo, setAddedToDo] = useState<boolean>(false);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <section className="to-do-container flex flex-col items-center ">
      <ToDoInput setAddedToDo={setAddedToDo} addedToDo={addedToDo} />
      <article className="flex flex-col md:flex-row justify-center items-center mt-6 w-full">
        <ToDoList addedToDo={addedToDo} setAddedToDo={setAddedToDo} />
      </article>
      <button
        className="bg-[#fbe9c3] hover:bg-[#F9E2AF] text-[#855EDA] hover:text-[#4A249D] transition-all rounded-lg p-4 m-4"
        onClick={handleLogout}
      >
        Log out
      </button>
    </section>
  );
};

export default MainPage;
