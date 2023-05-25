import React, { useContext, useEffect, useState } from 'react'
import '../../style/messages.css'
import { myContext } from '../../Context'
import { MessageJwtApi } from '../../api/messageApi'
import {Send} from '@material-ui/icons';
import { queryUrlServer } from '../utils/manipulateString';
import MessageItem from './MessageItem';
import {CircularProgress} from '@material-ui/core'
import UseDebounce from '../utils/UseDebounce';
import {io} from 'socket.io-client';

let socket, selectedChatCompare
const {REACT_APP_MESSAGE_SERVICE} = process.env

function ChattingBox({getChats}) {
  const context = useContext(myContext)
  const debounce = UseDebounce()
  const {createMessageApi, getMessagesApi} = MessageJwtApi()
  
  const [socketConnected, setSocketConnected] = useState(false)
  const [messages, setMessages] = useState([])
  const [messageContent, setMessageContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [typing, setTyping] = useState(false)
  const [prev, setPrev] = useState(null)

  console.log('WHAT THE HOOLO');

  // { path: '/message' }
  useEffect(() => {
    socket = io(`${REACT_APP_MESSAGE_SERVICE}`, {path: '/message/socket'}) //, {path: '/message/socket'}
    socket.emit('setup', context.userObj)
    socket.on('connected', () => {
      setSocketConnected(true)
    })
    socket.on('typing', (room) => {
      setIsTyping(true); 
      setPrev(room)
    })
    socket.on('stop typing', () => setIsTyping(false) )
    // socket.on('get chats', async () => {
    //   await getChats()
    //   console.log('get chat'); 
    // })
    socket.off('msg_received').on('msg_received', (newMessage) => {
      console.log(selectedChatCompare.id + ' ' + newMessage.chatId);
      if (!selectedChatCompare || selectedChatCompare.id !== newMessage.chatId) {
        console.log('receive message');
        getChats()
      } else {
        getMessagesApi(queryUrlServer({chatId: selectedChatCompare?.id}))
        .then(data => { setMessages(data.messages); setLoading(false)})
        .catch(e => alert(e.message))
        // if (messages[messages.length - 1].id === newMessage.id) {
        //   console.log('is equal');
        //   return
        // }
        // setMessages((current) => (current.concat([newMessage])))
      }
    })
  }, [])

    //fetch chats
    useEffect(() => {
      if (context.selectedChat != null) {
        fetchChats()
        selectedChatCompare = context.selectedChat
      }
    }, [context.selectedChat])

  console.log(messages);

  // useEffect(() => {
  //   if (!selectedChatCompare) {
  //     return
  //   }
  //   socket.emit('get chats', {users: context.selectedChat?.Users})

  // }, [context.createdChat])
  


  const fetchChats = async () => {
    if (!context.selectedChat) return

    console.log('fetch chat function');
    setLoading(true)
    getMessagesApi(queryUrlServer({chatId: context.selectedChat?.id}))
      .then(data => { setMessages(data.messages); setLoading(false)})
      .catch(e => alert(e.message))
        
    socket.emit('join chat', context.selectedChat?.id)
      // socket.emit('get chats', {users: [...context.selectedChat?.Users]})
  }


  // useEffect(() => {
  //   socket.emit('typing', context.selectedChat?.id)
  //   debounce(() => socket.emit("stop typing", context.selectedChat?.id), 2000)
  // }, [messageContent])
  
  // useEffect(() => {
  //   socket.off('msg_received').on('msg_received', async (newMessage) => {
  //     if (!selectedChatCompare || selectedChatCompare.id !== newMessage.chatId) {
  //       await getChats()
  //     } else {
  //       console.log('msg: ', newMessage);
  //       setMessages([...messages, newMessage])
  //     }
  //   })
  // })

  const onSendMessage = (e) => {
    e.preventDefault()
    // console.log('Ngu');
    setMessageContent('')
    createMessageApi({content: messageContent, userId: context.userObj?.id, chatId: context.selectedChat?.id})
    .then(async (data) =>{
      // key
      setMessages(messages => [...messages, data.message])
      socket.emit('new_msg', {chat: context.selectedChat, newMessage: data.message})
    })
    .catch(e  => alert(e.message))
  }

  //typing handler
  const typingHandler = (e) => {
    setMessageContent(e.target.value)
    if (!socketConnected) return

    if (!typing) {
      setTyping(true)
      socket.emit('typing', context.selectedChat?.id)
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 2000;

    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength ) {
        socket.emit("stop typing", context.selectedChat?.id);
        setTyping(false);
      }
    }, timerLength)
  }


  
  return (
    <div id='chattingBox_container'>
    {!context.selectedChat ? 
      <div style={{position: 'absolute', fontSize: '20px ', left:'50%',top:'50%',transform:'translate(-50%, -50%)'}}>
        Select a chat to start a conversation
      </div> : 
      <>
        {loading && <CircularProgress color='primary' style={{position: 'absolute', fontSize: '20px ', left:'50%',top:'50%',transform:'translate(-50%, -50%)'}} />}
        <div id='messages_box'>
          <div id='message_pos'>
            {messages?.map((message, i) => {
              return <MessageItem key={message.id} message={message} i={i} messages={messages} />
            })}
            {(isTyping && prev==context.selectedChat?.id) && <div>typing...</div>}
          </div>
          
        </div>

        

        <form onSubmit={onSendMessage} id='message_form'>
          <input value={messageContent} type="text" placeholder='Enter message' onChange={typingHandler} />
          {/* <Send style={{marginLeft: '5px'}} onClick={onSendMessage} /> */}
        </form>
      </>
    }
      
    </div>
  )
}

export default ChattingBox