import { forwardRef, useEffect, useState } from "react";

import MaterialTable, { Icons, Column } from "material-table";
import {
  AddBox,
  Check,
  Clear,
  DeleteOutline,
  ChevronRight,
  Edit,
  SaveAlt,
  FilterList,
  FirstPage,
  LastPage,
  ChevronLeft,
  Search,
  ArrowUpward,
  Remove,
  ViewColumn,
} from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import axios from "axios";

interface KiaraTableProps<RowData extends object> {
  columns: Array<Column<RowData>>;
  loadRowsData: () => Promise<Array<RowData>>;
}

type KiaraTableRowData = {
  KegiatanId: string;
  TanggalWaktuAwal: string;
  TanggalWaktuAkhir: string;
  Uraian: string;
  Lokasi: string;
  Keterangan: string;
};

const kiaraTableIcons: Icons = {
  Add: forwardRef((props, ref) => <AddBox {...props} innerRef={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} innerRef={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} innerRef={ref} />),
  Delete: forwardRef((props, ref) => (
    <DeleteOutline {...props} innerRef={ref} />
  )),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} innerRef={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} innerRef={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} innerRef={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} innerRef={ref} />),
  FirstPage: forwardRef((props, ref) => (
    <FirstPage {...props} innerRef={ref} />
  )),
  LastPage: forwardRef((props, ref) => <LastPage {...props} innerRef={ref} />),
  NextPage: forwardRef((props, ref) => (
    <ChevronRight {...props} innerRef={ref} />
  )),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} innerRef={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} innerRef={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} innerRef={ref} />),
  SortArrow: forwardRef((props, ref) => (
    <ArrowUpward {...props} innerRef={ref} />
  )),
  ThirdStateCheck: forwardRef((props, ref) => (
    <Remove {...props} innerRef={ref} />
  )),
  ViewColumn: forwardRef((props, ref) => (
    <ViewColumn {...props} innerRef={ref} />
  )),
};

const KiaraTable = ({ columns }: KiaraTableProps<KiaraTableRowData>) => {
  let [data, setData] = useState<Array<KiaraTableRowData>>([]);
  const history = useHistory();
  let handleAddButton = () => history.push("/kegiatanharianform");
  useEffect(() => {
    axios.get("http://localhost:4000/kegiatan").then(
      (value) => {
        setData(value.data as Array<KiaraTableRowData>);
      },
      (reason: any) => {
        /*error fetching data*/
      }
    );
  }, []);
  return (
    <MaterialTable
      title="Kegiatan Harian"
      icons={kiaraTableIcons}
      columns={columns}
      data={data}
      actions={[
        {
          icon: AddBox,
          position: "toolbar",
          onClick: handleAddButton,
        },
      ]}
    />
  );
};

export default KiaraTable;
