import { Form } from "formik";

export default function FormBase({ children }) {
  return (
    <Form className="my-10 flex flex-col justify-center gap-5 p-5 h-4/6 w-11/12 md:h-full md:flex-row  md:w-9/12 bg-white rounded-lg shadow-card border-2 border-darkOrange">
      {children}
    </Form>
  );
}
