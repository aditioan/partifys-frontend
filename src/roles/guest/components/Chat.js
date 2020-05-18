import React from 'react'
import { Chat, addResponseMessage } from 'react-chat-popup';
import io from 'socket.io-client';


const socket = io(process.env.REACT_APP_SIGNALING_URI);
let userName = ''

const handleNewUserMessage = function(msg){
  socket.emit("chat message", {message: msg,user:userName });
  

}

socket.on('new_message',(data)=>{
  addResponseMessage(data.user+": "+ data.message)
})

export default function ChatWindow(props) {
  let party = props.party;
  userName = props.name;
  return (
    <div>
       <Chat
          handleNewUserMessage={handleNewUserMessage}
          title={party+"'s Party"} 
          
        />
      
    </div>
  )
}
