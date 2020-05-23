import React from 'react'
import { getGuests } from 'roles/host/reducers'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import {EmojiPeople } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
  }));




function Guests({guests}) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
        {guests.map(function(value) {
                if(value.isConnected){
                const name = value.name.split('-')[0]
                if(name==='Anonymous'){
                    return <Tooltip title={name}><Avatar><EmojiPeople/></Avatar></Tooltip>
                }
                else{
                return <Tooltip title={name}><Avatar>{name.charAt(0)}</Avatar></Tooltip>
                }
              }
            })}
            
      </div>
    )
}

Guests.propTypes = {
    guests : PropTypes.array.isRequired
  }
  
  export default connect(state => ({
    guests: getGuests(state)
  }))(Guests)

