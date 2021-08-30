import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
} from "@material-ui/data-grid";
import axios from "axios";

interface KiaraTableProps {}

interface KegiatanHarianRow {
  id: string;
  KegiatanId: string;
  TanggalWaktuAwal: string;
  TanggalWaktuAkhir: string;
  Uraian: string;
  Lokasi: string;
  Keterangan: string;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID" },
  { field: "TanggalWaktuAwal", headerName: "Waktu Awal Kegiatan" },
  { field: "TanggalWaktuAkhir", headerName: "Waktu Akhir Kegiatan" },
  { field: "Uraian", headerName: "Uraian Kegiatan" },
  { field: "Lokasi", headerName: "Lokasi Kegiatan" },
  { field: "Keterangan", headerName: "Keterangan Kegiatan" },
];

const fetchRows = async () => {
  let data;
  try {
    data = await axios.get("http://localhost:4000/kegiatan");
    return data;
  } catch (e) {
    //do something if error
    return undefined;
  }
};

const KiaraTable = (props?: KiaraTableProps) => {
  const [rows, setRows] = useState<Array<KegiatanHarianRow>>([]);
  useEffect(() => {
    fetchRows().then(
      (kegiatan) => {
        kegiatan !== undefined
          ? (function () {
              (kegiatan.data as Array<KegiatanHarianRow>).map(
                (value) => (value["id"] = value.KegiatanId)
              );
              setRows(kegiatan.data);
            })()
          : setRows([]);
      },
      (reason: any) => {}
    );
  }, []);
  return (
    <div style={{ height: "40vh", width: "100%" }}>
      <DataGrid columns={columns} rows={rows} />
    </div>
  );
};

export default KiaraTable;
