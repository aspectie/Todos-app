import { cn } from "../../lib/utils";
import { Button } from "../../UI/Button";

export function TodosToolbar({
  onClickAll,
  onClickActive,
  onClickCompleted,
  activeButton,
}) {
  const classNames = (active) =>
    cn("p-2 hover:bg-white", {
      "bg-white": activeButton === active,
    });
  return (
    <div className="flex bg-amber-300">
      <Button className={classNames("all")} onClick={onClickAll}>
        All
      </Button>
      <Button className={classNames("active")} onClick={onClickActive}>
        Active
      </Button>
      <Button className={classNames("completed")} onClick={onClickCompleted}>
        Completed
      </Button>
    </div>
  );
}
