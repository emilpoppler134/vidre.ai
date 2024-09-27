import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { TextField } from "./TextFields";

type PasswordFieldProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  title: string;
  form: UseFormReturn<TFieldValues>;
  autoComplete?: string;
  className?: string;
};

const PasswordField = <T extends FieldValues>({
  name,
  title,
  form,
  autoComplete = "new-password",
  className,
}: PasswordFieldProps<T>): JSX.Element => {
  return (
    <TextField
      name={name}
      title={title}
      type="password"
      form={form}
      autoComplete={autoComplete}
      className={className}
    />
  );
};

export default PasswordField;
