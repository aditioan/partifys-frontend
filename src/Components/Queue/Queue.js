import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
export default class Queue extends Component {
    render() {
        return (
            <div>
                <TextField
          id="outlined-full-width"
          label="Search"
          style={{ margin: 8 }}
          placeholder="Add songs to queue"
          
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <div>
            Queue is empty
        </div>
            </div>
        )
    }
}
