import {useState} from 'react'
import {DateTime} from 'luxon'
import KiaraDatePicker from './KiaraDatePicker'
import {FormControl,InputLabel} from '@material-ui/core';
import {makeStyles} from  '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
  kegiatanHarianForm: {
    display: 'flex',
    flexDirection: 'column',
    "& > *": {
      margin: theme.spacing(1),
    }
  }
}))

const KegiatanHarianForm = () => {
  const classes = useStyles()
  const [date, setDate] = useState<DateTime>(DateTime.now());
  return (
    <form noValidate autoComplete="off" className={classes.kegiatanHarianForm}>
      <FormControl>
        <InputLabel htmlFor="form-kegiatan-harian__tanggal-waktu-awal">Tanggal Waktu Awal</InputLabel>
        <KiaraDatePicker 
          id="form-kegiatan-harian__tanggal-waktu-awal"
          date={date} 
          onDateChange={(date: DateTime | null) => {
            date ? setDate(date) : setDate(DateTime.now());
          }}
        />
      </FormControl>
      <KiaraDatePicker 
        date={date} 
        onDateChange={(date: DateTime | null) => {
          date ? setDate(date) : setDate(DateTime.now());
        }}
      />
    </form>
  )
}
export default KegiatanHarianForm
