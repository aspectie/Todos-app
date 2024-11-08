export function Button({ clickHandler, children, ...props }) {
  return (
    <button onClick={clickHandler} {...props}>
      {children}
    </button>
  );
}
