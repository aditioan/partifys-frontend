import React from 'react'
import { Chat, addResponseMessage } from 'react-chat-popup';
import io from 'socket.io-client';
import { getParty } from 'roles/host/reducers'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const socket = io(process.env.REACT_APP_SIGNALING_URI);


const handleNewUserMessage = function(msg){

  socket.emit("chat message", {message: msg,user: 'Host' });

}

socket.on('new_message',(data)=>{
  addResponseMessage(data.user+": "+ data.message)
})
function ChatWindow({ party}) {
  
  return (
    <div>
       <Chat
          handleNewUserMessage={handleNewUserMessage}
          title={party.name+"'s Party"}
          
        />
      
    </div>
  )
}

ChatWindow.propTypes = {
  party: PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired
  }).isRequired
}

export default connect(state => ({
  party: getParty(state)
}))(ChatWindow)
