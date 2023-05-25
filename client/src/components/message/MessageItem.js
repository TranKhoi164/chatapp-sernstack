import React, { useContext } from 'react'
import '../../style/messages.css'
import { myContext } from '../../Context'
import {Avatar} from '@material-ui/core'

function MessageItem({message, i, messages}) {
  const context = useContext(myContext)

  const checkToShowAvatar = () => {
    if (message?.User?.id !== context.userObj?.id && (message?.User?.id !== messages[i+1]?.User?.id || !messages[i+1]?.User?.id)) {
      return true
    } else return false
  }

  const checkToShowName = () => {
    if (message?.User?.id !== context.userObj?.id && (message?.User?.name !== messages[i-1]?.User?.name || !messages[i-1]?.User?.name)) {
      return true
    } else return false
  }

  return (
    <>
      {checkToShowName() && <div style={{marginLeft: '50px', marginTop: '10px', fontSize: '14px', color: 'gray'}}>{message?.User?.name}</div>}
      <div className="messageItem_box" 
      style={message?.User?.id==context.userObj?.id
      ?{ justifyContent:'flex-end' }:{}}>

      <Avatar alt={context.userObj?.name} src={context.userObj?.picture} 
        style={{
          marginRight: '5px',
          width:'30px', 
          height: '30px',
          opacity: checkToShowAvatar() ? '1' : '0',
        }}
      />

      <div className='message_item' 
        style={message.User.id==context.userObj.id ?
        {background: 'rgb(106, 165, 254)'} : {}}>
        {message.content}
      </div>
    </div>
    </>
  )
}

export default MessageItem