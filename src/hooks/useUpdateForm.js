import { useRef, useState } from "react";

export default function useUpdateForm(mutate, data) {
  const [isEditable, setIsEditable] = useState(false);
  const setFormRef = useRef(null);

  const handleUpdate = (values, { setSubmitting }) => {
    mutate({ ...values });
    setSubmitting(false);
    setIsEditable(false);
    setFormRef.current = { ...values };
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditable(!isEditable);
    setFormRef.current({ ...data });
  };

  return { isEditable, setFormRef, handleUpdate, handleEdit };
}
