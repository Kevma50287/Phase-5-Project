import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function Sort({sortVal, setSortVal}) {
  
  const handleRadio = (e) => {
    setSortVal(e.target.value)
  }
  
  return (
    <div className='sortRadio'>
      <FormControl>
        <FormLabel id="row-radio-buttons-group-label" >Sort By: </FormLabel>
        <RadioGroup
          row
          aria-labelledby="row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={sortVal}
          onChange={handleRadio}
        >
          <FormControlLabel value='0' control={<Radio />} label="None" />
          <FormControlLabel value="1" control={<Radio />} label="Distance" />
          <FormControlLabel value="2" control={<Radio />} label="Party Size" />

        </RadioGroup>
      </FormControl>
    </div>
  );
}