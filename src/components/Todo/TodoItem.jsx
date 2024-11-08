import { useRef } from "react";
import { cn } from "../../lib/utils";

import { Checkbox } from "../../UI/CheckBox";

export function TodoItem({ title, id, completed, toggleHandler }) {
  const checkBoxRef = useRef(null);

  return (
    <div className="p-2 mb-3 last:mb-0 w-full border rounded flex items-center hover:bg-amber-100">
      <Checkbox
        ref={checkBoxRef}
        id={id}
        checked={completed}
        onCheckedChange={toggleHandler}
      />
      <label
        htmlFor={id}
        className={cn(
          "px-2 w-full text-lg first-letter:uppercase hover:cursor-pointer",
          { "line-through": completed },
        )}
      >
        {title}
      </label>
    </div>
  );
}
