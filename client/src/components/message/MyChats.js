import React, { useContext, useEffect, useState } from 'react'
import '../../style/messages.css'
import { myContext } from '../../Context'
import ChatItem from './ChatItem'
import CreateGroupChatModal from './CreateGroupChatModal'


function MyChats({getChats}) {
  const context = useContext(myContext)
  const [openModal, setOpenModal] = useState(false);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    getChats()
  }, [])
  

  return (
    <div id='myChats_container'>
      <div id='create_groupChat'>
        <div>My Chats</div>
        <button onClick={handleClickOpen}>New Group Chat +</button>
      </div>
      {context?.chats?.map(chat => {
        return <ChatItem key={chat?.id} chat={chat} />
      })}
      <CreateGroupChatModal getChats={getChats} open={openModal} handleClose={handleClose} />
    </div>
  )
}

export default MyChats