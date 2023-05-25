import axios from "axios"
import { useContext } from "react"
import { myContext } from "../Context"
import AxiosJWT from "../AxiosJWT"

const {REACT_APP_CHAT_SERVICE} = process.env

export function ChatJwtApi() {
  const {userObj} = useContext(myContext)
  const axiosJwt = AxiosJWT()

  //query contain userId
  const getChatsApi = (query) => {
    return new Promise((resolve, reject) => {
      axiosJwt.get(REACT_APP_CHAT_SERVICE + '/chat/get_chats', 
        {headers: {Authorization: userObj?.accessToken}}
      ).then(data => {
        console.log(data);
        resolve(data.data)
      }).catch(e => {
        console.log(e);
        if (!e.response?.data?.message) {
          reject(e)
        }
        reject(e.response.data)
      }) 
    })
  }

  const createChatApi = (chat) => {
    return new Promise((resolve, reject) => {

      axiosJwt.post(REACT_APP_CHAT_SERVICE + '/chat/create_chat', 
        {chat: chat},
        {headers: {Authorization: userObj?.accessToken}}
      ).then(data => {
        console.log(data);
        resolve(data.data)
      }).catch(e => {
        if (!e.response?.data?.message) {
          reject(e)
        }
        reject(e.response.data)
      }) 
    })
  }
  return {
    getChatsApi: getChatsApi,
    createChatApi: createChatApi,
  }
}
