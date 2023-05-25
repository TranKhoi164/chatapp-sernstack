import React, { createContext, useEffect, useState } from 'react'
import { getUserInforApi } from './api/userApi';
import { ChatJwtApi } from './api/chatApi';

const getInitializeState = () => {
  const userObj = localStorage.getItem('userObj')
  return userObj ? JSON.parse(userObj) : null
}

export const myContext = createContext({});
function Context(props) {
  const {getChatsApi} = ChatJwtApi()
  const [userObj, setUserObj] = useState(getInitializeState())
  const [selectedChat, setSelectedChat] = useState(null)
  const [chats, setChats] = useState([])
  const [createdChat, setCreatedChat] = useState(null)

  console.log('select: ', selectedChat);

  
  useEffect(() => {
    if (userObj !== null) {
      localStorage.setItem('userObj', JSON.stringify(userObj));
    }
  }, [userObj])

  // const getChats = () => {
  //   getChatsApi().then(data => {
  //     setChats(data.chats)
  //   })
  // }

  

  // useEffect(() => {
  //   getUserInforApi().then(user => {
  //     console.log(user);
  //     if (user.user) {
  //       setUserObj(user.user)
  //     }
  //   })
  // }, [])
  const data = {
    userObj: userObj, 
    setUserObj: setUserObj,
    selectedChat: selectedChat,
    setSelectedChat: setSelectedChat,
    chats: chats,
    setChats: setChats,
    createdChat: createdChat,
    setCreatedChat: setCreatedChat,
  }

  return (
    <myContext.Provider 
      value={data}>
      {props.children}
    </myContext.Provider>
  )
}

export default Context