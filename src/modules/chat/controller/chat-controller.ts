import { useState } from "react";
import { useForm } from "react-hook-form";

export const useInputController = () => {
  const [message, setMessage] = useState("");

  const { handleSubmit, control } = useForm({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return {
    message,
    handleSubmit,
    onSubmit,
    control
  };
};
