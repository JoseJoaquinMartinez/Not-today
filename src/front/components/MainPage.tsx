import "../styles/components/ToDo.css";
import ToDoInput from "./ToDoInput";
import ToDoList from "./ToDoList";

const MainPage = () => {
  return (
    <div className="to-do-container flex flex-col items-center ">
      <ToDoInput />
      <ToDoList />
    </div>
  );
};

export default MainPage;
