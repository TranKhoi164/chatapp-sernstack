import React, { useContext } from 'react'
import '../../style/messages.css'
import MyChats from './MyChats'
import ChattingBox from './ChattingBox'
import { ChatJwtApi } from '../../api/chatApi'
import { myContext } from '../../Context'

function MessagesPage() {
  const context = useContext(myContext)
  const {getChatsApi} = ChatJwtApi()

  const getChats = () => {
    return new Promise((resolve, reject) => {
      getChatsApi().then(data => {
        console.log('getChat');
        context.setChats(data.chats)
        resolve()
      }).catch(e => {
        alert(e.message)
        reject()
      })
    })
  }

  return (
    <div id='messagePage_container'>
      <MyChats getChats={getChats} />
      <ChattingBox getChats={getChats} />
    </div>
  )
}

export default MessagesPage