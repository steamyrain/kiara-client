import { MenuItem, Select, InputLabel } from "@material-ui/core";
import { IKegiatanHarianForm } from "./KegiatanHarianForm";
import { useController, UseControllerProps } from "react-hook-form";

export interface IMenuItemProps {
  value: string;
  label: string;
}

interface KiaraSelectProps<T extends IMenuItemProps> {
  selectId: string;
  selectLabelId: string;
  inputLabelLabel: string;
  inputLabelId: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onChange: () => void;
  items: Array<T>;
}

/*
interface KiaraSelectProps<T extends IMenuItemProps>
  extends UseControllerProps<IKegiatanHarianForm> {
  selectId: string;
  selectLabelId: string;
  inputLabelLabel: string;
  inputLabelId: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onChange: () => void;
  items: Array<T>;
}
*/

const KiaraSelect = <T extends IMenuItemProps>(props: KiaraSelectProps<T>) => {
  /*
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController(props);
   */

  return (
    <div>
      <InputLabel id={props.inputLabelId}>{props.inputLabelLabel}</InputLabel>
      <Select
        labelId={props.selectLabelId}
        id={props.selectId}
        open={props.open}
        onClose={props.onClose}
        onOpen={props.onOpen}
        onChange={props.onChange}
        value={
          props.items.length > 0 ? console.log(props.items[0].value) : undefined
        }
      >
        {props.items.map((item: T) => {
          return <MenuItem value={item.value}>{item.label}</MenuItem>;
        })}
      </Select>
    </div>
  );
};

export default KiaraSelect;
