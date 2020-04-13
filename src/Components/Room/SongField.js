import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import data from './data.json'

const Search = ()=>{
    console.log("test");
    //const bearer = "BQBYQ7_2Mj1U1O-k8v16vRSJYAWkjoWGPQyYioHwW2fpYJejcexqJPgPxbOrt6yT6CALlTp4wVczhKlHQ-BJ_0kMWmyTcQzXiuv1dd4sYUSy056QB9QlAqmFdfv4FEvQ02LmYpx3iuZ8RZLjhT2hSsBFwb7_RaZ-gL5Yq0ts8uFIiC5NT68_GvBfsh660vSwWLvujuVMmaD6eQYMrk9f1ZESl8tT4AbOHRciOWh8Tcj3Fjuq41f-05xCbTw1W0K5pbumaIQeELnYijR2VHtg1hFY3Q4i6gDKwQ";
    
}

export default function SongField(props) {
    return (
        <div>
             <TextField
          id="outlined-full-width"
          label="Search"
          style={{ margin: 8 }}
          placeholder="Add songs to queue"
          onKeyPress={Search}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={data.map((option) => option.title)}
                renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search input"
                    margin="normal"
                    variant="outlined"
                    InputProps={{ ...params.InputProps, type: 'search' }}
                />
                )}
            />
        </div>
    )
}
