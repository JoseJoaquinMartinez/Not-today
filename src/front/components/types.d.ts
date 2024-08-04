export type decodedToken = {
  userId: number;
};

export type ToDoProps = {
  id: number;
  todo: ToDoType[];
  userId: number;
};

export type ToDoType = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: newDate;
  userId: number;
  notToDo: string[];
};

export interface ToDoInputProps {
  setAddedToDo: React.Dispatch<React.SetStateAction<boolean>>;
  addedToDo: boolean;
}
