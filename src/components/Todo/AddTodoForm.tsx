import { Form, Field } from "react-final-form";
import { Button } from "../../UI/Button";
import { cn } from "../../lib/utils";

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
  return (
    <div className="mb-10">
      <input
        {...input}
        type={type}
        id={id}
        placeholder={placeholder}
        className={cn("w-full", { "border-red-600": touched && error })}
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
            className="p-2 rounded-sm bg-amber-300 hover:bg-gray-300 w-full"
          >
            Add
          </Button>
        </form>
      )}
    </Form>
  );
};

export default AddTodoForm;
