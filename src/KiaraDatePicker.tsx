import { DatePicker } from "@material-ui/pickers";
import { DateTime } from "luxon";

interface KiaraDatePickerProps {
  id?: string;
  date: DateTime;
  onDateChange(d: DateTime | null): void;
}

const KiaraDatePicker = (props: KiaraDatePickerProps) => {
  return (
    <DatePicker
      autoOk
      openTo="date"
      id={props.id?props.id:undefined}
      value={props.date}
      onChange={props.onDateChange}
    />
  );
};

export default KiaraDatePicker;
