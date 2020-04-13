import React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import InfoIcon from '@material-ui/icons/Info';
import Divider from "@material-ui/core/Divider";
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import ChatIcon from '@material-ui/icons/Chat';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from "@material-ui/core/styles";
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const drawerWidth = 240;
const useStyles = makeStyles(theme => ({

    toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  }
}));


const iconsPrimary = [
  {
    "name":"Queue",
    "return":<MusicNoteIcon/>,
    "path":"/queue"
  },
  {
    "name":"Members",
    "return":<PeopleAltIcon/>,
    "path":"/members"
  },
  {
    "name":"Settings",
    "return":<SettingsIcon/>,
    "path":"/settings"
  },
  {
    "name":"Invite",
    "return":<MailIcon/>,
    "path":"/invite"
  },
  {
    "name":"Chat",
    "return":<ChatIcon/>,
    "path":"/chat"
  }

]

const iconSecondary =[
  {
    "name":"Logout",
    "return":<ExitToAppIcon/>,
    "path":"/logout"
  },
  {
    "name":"About",
    "return":<InfoIcon/>,
    "path":"/about"
  },
  {
    "name":"Privacy",
    "return":<VerifiedUserIcon/>,
    "path":"/privacy"
  },

]



export default function SideContent(props) {

  const classes = useStyles();

    return (
   
        <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
      

        {
            iconsPrimary.map((icon, index) => (
              <ListItem button key={index}>
                <ListItemIcon>
                  {icon.return}
                </ListItemIcon>
                <Link to={icon.path}><ListItemText primary={icon.name} /></Link>
                
              </ListItem>
            ))


        }
      </List>
      <Divider />
      <List>
        {iconSecondary.map((icon, index) => (
          <ListItem button key={index}>
            <ListItemIcon>
              {icon.return}
            </ListItemIcon>
            <Link to={icon.path}><ListItemText primary={icon.name} /></Link>
          </ListItem>
        ))}
      </List>
    </div>

    )
}
