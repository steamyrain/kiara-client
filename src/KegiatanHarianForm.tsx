import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import KiaraDateTimePicker from "./KiaraDateTimePicker";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, SubmitHandler } from "react-hook-form";
import KiaraTextField from "./KiaraTextField";
import KiaraSelect, { IMenuItemProps } from "./KiaraSelect";
import axios from "axios";

export interface IKegiatanHarianForm {
  Uraian: string;
  Lokasi: string;
  TanggalWaktuAwal: DateTime;
  TanggalWaktuAkhir: DateTime;
  Keterangan?: string;
  TenagaKerjas: Array<ITenagaKerja>;
}

interface ITenagaKerja {
  TenagaKerjaId: string;
  JobName: string;
  Jumlah: string;
}

interface TenagaKerjaInputPort extends IMenuItemProps {
  Jenis: string;
}

const KHFDefaultValues: IKegiatanHarianForm = {
  Uraian: "",
  Lokasi: "",
  TanggalWaktuAwal: DateTime.now().startOf("minute"),
  TanggalWaktuAkhir: DateTime.now().startOf("minute"),
  TenagaKerjas: [],
};

const useStyles = makeStyles((theme) => ({
  kegiatanHarianFormWrapper: {
    padding: theme.spacing(4, 4),
    "& > div": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },
  kegiatanHarianForm: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      margin: theme.spacing(2, 0),
    },
  },
}));

const KegiatanHarianForm = () => {
  const [open, setOpen] = useState(false);
  const [tenagaKerjas, setTenagaKerjas] = useState<Array<TenagaKerjaInputPort>>(
    []
  );
  const classes = useStyles();
  const { control, handleSubmit } = useForm<IKegiatanHarianForm>({
    defaultValues: KHFDefaultValues,
  });
  const onSubmit: SubmitHandler<IKegiatanHarianForm> = async (
    data: IKegiatanHarianForm
  ) => {
    try {
      await axios.post("http://localhost:4000/kegiatan", data);
    } catch (e) {
      //do something if error
    }
  };
  useEffect(() => {
    axios
      .get<Array<TenagaKerjaInputPort>>(
        "http://localhost:4000/tenagakerja/jenis"
      )
      .then(
        (value) => {
          setTenagaKerjas(
            value.data.map((value) => {
              return {
                Jenis: value.Jenis,
                value: value.Jenis,
                label: value.Jenis,
              };
            })
          );
        },
        (reason: any) => {
          /*error fetching data*/
        }
      );
  }, []);
  return (
    <div className={classes.kegiatanHarianFormWrapper}>
      <div>
        <Typography variant="h5">Form Kegiatan Harian</Typography>
      </div>
      <form
        className={classes.kegiatanHarianForm}
        onSubmit={handleSubmit(onSubmit)}
      >
        <KiaraTextField
          name={"Uraian"}
          control={control}
          label={"Uraian Kegiatan"}
          rules={{ required: "*Wajib" }}
        />
        <KiaraTextField
          name={"Lokasi"}
          control={control}
          label={"Lokasi Kegiatan"}
          rules={{ required: "*Wajib" }}
        />
        <KiaraDateTimePicker
          control={control}
          name="TanggalWaktuAwal"
          label={"Tanggal Waktu Awal Kegiatan"}
          rules={{ required: "*Wajib" }}
        />
        <KiaraDateTimePicker
          control={control}
          name="TanggalWaktuAkhir"
          label={"Tanggal Waktu Akhir Kegiatan"}
          rules={{ required: "*Wajib" }}
        />
        <KiaraTextField
          name={"Keterangan"}
          control={control}
          label={"Keterangan Kegiatan"}
          multiLine={true}
          rows={4}
        />
        <KiaraSelect
          inputLabelId={"tenaga-kerja__label"}
          inputLabelLabel={"Tenaga Kerja"}
          selectId={"tenaga-kerja__select"}
          selectLabelId={"tenaga-kerja__label"}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          onChange={() => {
            console.log("changed");
          }}
          items={tenagaKerjas}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default KegiatanHarianForm;
