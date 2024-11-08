import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "../../UI/Dialog";
import { Button } from "../../UI/Button";
import AddTodoForm from "./AddTodoForm";
import uuid from "react-uuid";
import { addTodoThunk } from "../../store/todos-reducer";
import { reset } from "redux-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../..//store/root-store";

export function AddTodoDialog() {
  const dispatch: AppDispatch = useDispatch();
  const submitHandler = ({ title }: { title: string }) => {
    const todo = {
      title,
      isDone: false,
      id: uuid(),
    };

    dispatch(addTodoThunk(todo));
    dispatch(reset("todoForm"));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add todo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <AddTodoForm handleSubmit={(values) => submitHandler(values)} />
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
