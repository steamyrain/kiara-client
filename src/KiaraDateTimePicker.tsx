import React from "react";
import { DateTime } from "luxon";
import { DateTimePicker } from "@material-ui/pickers";
import { useController, UseControllerProps } from "react-hook-form";
import { IKegiatanHarianForm } from "./KegiatanHarianForm";

interface KiaraDateTimePickerProps
  extends UseControllerProps<IKegiatanHarianForm> {
  label?: string;
  id?: string;
}

const KiaraDateTimePicker = (props: KiaraDateTimePickerProps) => {
  const {
    field: { ref, value, ...inputProps },
    fieldState: { error },
  } = useController(props);
  return (
    <DateTimePicker
      autoOk
      inputVariant={"outlined"}
      ampm={false}
      label={error ? `${props.label}*` : props.label}
      id={props.id}
      value={value as DateTime}
      error={Boolean(error)}
      helperText={error && error.message}
      {...inputProps}
    />
  );
};

export default KiaraDateTimePicker;
