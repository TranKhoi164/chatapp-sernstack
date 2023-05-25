import React, { useContext } from 'react'
import '../../style/messages.css'
import { myContext } from '../../Context'
import { cutString } from '../utils/manipulateString'


function ChatItem({ chat }) {
  const context = useContext(myContext)

  const click = () => {
    context.setSelectedChat(chat)
  }
  
  const currentUser = () => {
    // const a = chat?.Messages[chat?.Messages?.length-1]?.userId
    const a = chat?.Messages[chat?.Messages?.length-1]?.userId
    for (let i = 0; i < chat?.Users?.length; i++) {
      let b = chat?.Users[i].id

      if (b == a) {
        return chat?.Users[i]?.name
      }
    }
  }

  return (
    <div onClick={click} style={{background: chat?.id === context.selectedChat?.id && '#d6d6d6'}} className='chat_items'>
      <div className="chat_name">
        {chat?.name || (chat?.Users[0]?.name === context.userObj.name ? chat?.Users[1]?.name : chat?.Users[0]?.name)}
      </div>
      {/* {chat?.Messages.length > 0 && <div className="latest_message">
        <span style={{fontWeight:'bold'}}>{currentUser()}:</span> {cutString(chat?.Messages[chat?.Messages?.length-1]?.content, 25)}
      </div>} */}
    </div>
  )
}

export default ChatItem