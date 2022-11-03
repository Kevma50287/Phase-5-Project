import { MenuItem } from "@mui/material"
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import uuid from 'react-uuid';

function toTitleCase(str) {
  return str.toLowerCase().split(' ').map(function (word) {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
}

const Filter = ({ setFilter, filter, tags=[] }) => {
  const handleChange = (e) => {
    setFilter(e.target.value)
  }

  const createArrayFromSetFunction = (set) => {
    let array = []
    set.forEach(item => {
      array.push(<MenuItem key={uuid()} value={item}>{toTitleCase(item)}</MenuItem>)
    });
    return array
  }

  const arrayOfTags = createArrayFromSetFunction(tags)


  return (
    <div>
      <h3 className='filterby'>Filter By Tags:</h3>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          labelId="TagSelect"
          id="TagSelect"
          value={filter}
          label="Tag"
          name='tag'
          onChange={handleChange}
        >
          <MenuItem value="None">
            <em>None</em>
          </MenuItem>
          {arrayOfTags}
          
        </Select>
      </FormControl>
    </div>
  )
}

export { toTitleCase }
export default Filter