import reducer, {
  addTodo,
  toggleTodoIsDone,
  initialState,
} from "./todos-slice";

const stateWithTodo = {
  todos: [
    {
      id: 1,
      title: "Test todo 1",
      completed: false,
      userId: 1,
    },
  ],
  status: null,
  error: null,
};

describe("todosSlice reducers", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should add a new todo", () => {
    const newTodo = { id: 3, title: "New todo", completed: false };
    const action = addTodo(newTodo);
    const state = reducer(stateWithTodo, action);

    expect(state.todos).toHaveLength(2);
  });

  it("should toggle the completed state of a todo", () => {
    const action = toggleTodoIsDone(1);
    const state = reducer(stateWithTodo, action);

    expect(state.todos[0].completed).toBe(true);
  });

  it("should toggle the completed state of non-existing todo", () => {
    const action = toggleTodoIsDone(2);
    const state = reducer(stateWithTodo, action);

    expect(state.todos[0].completed).toBe(false);
  });
});
