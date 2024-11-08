import { Field, reduxForm } from "redux-form";
import { Button } from "../UI/Button";

const required = (value) => (value ? undefined : "Required");

const renderField = ({
  id,
  input,
  placeholder,
  type,
  meta: { touched, error },
}) => {
  let invalidClass = touched && error ? "border-red-600" : "";

  return (
    <div className="mb-5">
      <input
        {...input}
        type={type}
        id={id}
        placeholder={placeholder}
        className={invalidClass}
      />
      {touched && error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export let TodoForm = (props) => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field
        id="title"
        name="title"
        component={renderField}
        type="text"
        placeholder="What needs to be done ?"
        className="block form-input"
        validate={[required]}
      />
      <Button
        type="submit"
        className="p-2 rounded-lg bg-orange-400 text-white hover:bg-amber-500"
      >
        Add todo
      </Button>
    </form>
  );
};

TodoForm = reduxForm({ form: "todoForm" })(TodoForm);
