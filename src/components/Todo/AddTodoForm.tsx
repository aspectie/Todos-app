import { Form, Field } from "react-final-form";
import { Button } from "../../UI/Button";

const required = (value: any) => (value ? undefined : "Required");

const renderField = ({
  id,
  input,
  placeholder,
  type,
  meta: { touched, error },
}: {
  id: string;
  input: any;
  placeholder: any;
  type: any;
  meta: any;
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

const AddTodoForm = ({
  handleSubmit,
}: {
  handleSubmit: (values: any) => void;
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field
            id="title"
            name="title"
            component={renderField}
            type="text"
            placeholder="What needs to be done ?"
            className="block form-input"
            validate={required}
          />
          <Button
            type="submit"
            className="p-2 rounded-lg bg-amber-300 hover:bg-gray-100 "
          >
            Add todo
          </Button>
        </form>
      )}
    </Form>
  );
};

export default AddTodoForm;
