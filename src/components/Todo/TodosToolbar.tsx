import { cn } from "../../lib/utils";
import { Button } from "../../UI/Button";

export function TodosToolbar({
  onClickAll,
  onClickActive,
  onClickCompleted,
  activeButton,
}: {
  onClickAll: () => void;
  onClickActive: () => void;
  onClickCompleted: () => void;
  activeButton: string;
}) {
  const classNames = (active: string): string =>
    cn("p-2 hover:bg-white w-32", {
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
