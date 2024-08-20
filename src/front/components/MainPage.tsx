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
      <article className="flex flex-col md:flex-row justify-between items-center mt-6">
        <ToDoList addedToDo={addedToDo} setAddedToDo={setAddedToDo} />
      </article>
      <button
        className="bg-[#855EDA] hover:bg-[#4A249D] text-[#fbe9c3] hover:text-[#F9E2AF] transition-all rounded-lg p-4 m-4"
        onClick={handleLogout}
      >
        Log out
      </button>
    </section>
  );
};

export default MainPage;
