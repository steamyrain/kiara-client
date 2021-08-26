import React from "react";
import { DateTime } from "luxon";
import KiaraDateTimePicker from "./KiaraDateTimePicker";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, SubmitHandler } from "react-hook-form";
import KiaraTextField from "./KiaraTextField";
import axios from "axios";

export interface IKegiatanHarianForm {
  Uraian: string;
  Lokasi: string;
  TanggalWaktuAwal: DateTime;
  TanggalWaktuAkhir: DateTime;
  Keterangan?: string;
}

const KHFDefaultValues: IKegiatanHarianForm = {
  Uraian: "",
  Lokasi: "",
  TanggalWaktuAwal: DateTime.now().startOf('minute'),
  TanggalWaktuAkhir: DateTime.now().startOf('minute'),
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
      margin: theme.spacing(4, 0),
    },
  },
}));

const KegiatanHarianForm = () => {
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
      console.error(e);
    }
    console.log("success");
  };
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
        <input type="submit" />
      </form>
    </div>
  );
};

export { KegiatanHarianForm as default };
