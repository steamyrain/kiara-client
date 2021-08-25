import { IKegiatanHarianForm } from "./KegiatanHarianForm";
import { TextField } from "@material-ui/core";
import { useController, UseControllerProps } from "react-hook-form";

interface KiaraTextFieldProps extends UseControllerProps<IKegiatanHarianForm> {
  id?: string;
  label?: string;
  multiLine?: boolean;
  rows?: number;
}

const KiaraTextField = (props: KiaraTextFieldProps) => {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController(props);
  return (
    <TextField
      variant="outlined"
      id={props.id}
      label={error ? `${props.label}*` : props.label}
      error={Boolean(error)}
      helperText={error && error.message}
      multiline={props.multiLine ? props.multiLine : false}
      rows={props.rows ? props.rows : 1}
      {...inputProps}
    />
  );
};

export default KiaraTextField;
