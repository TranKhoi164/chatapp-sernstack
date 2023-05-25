import { Avatar } from '@material-ui/core'
import React, { useContext } from 'react'
import { myContext } from '../../Context'
import { ChatJwtApi } from '../../api/chatApi'

function UserListItem({user, handleClose}) {
  const {createChatApi, getChatsApi} = ChatJwtApi()
  const context = useContext(myContext)

  const handleClick = async () => {
    try {
      //name, users
      // if (context.chats.find(e => e.))
      let check = true
      context.chats.forEach(chat => {
        chat.Users.forEach(e => {
          if (e.id == user.id && chat?.Users?.length == 2) {
            context.setSelectedChat(chat)
            check = false
          }
        })
      })
      //console.log('check', check);
      if (!check) {
        handleClose()
        return
      }

      const resCreateChat = await createChatApi({users: [context.userObj?.id, user.id]})
      context.setCreatedChat(!context.createdChat)
      context.setSelectedChat(resCreateChat?.chat)
      getChatsApi().then(data => {
        context.setChats(data.chats)
      }).catch(e => alert(e.message))
    } catch (e) {
      alert(e.message)
    }
    handleClose()
  }


  return (
    <div className='userList_item' onClick={handleClick} style={user?.id==context.userObj?.id ? {display:'none'}:{}} >
      <Avatar alt="Remy Sharp" src={user?.picture} />
      <div>{user?.name}</div>
    </div>
  )
}

export default UserListItem