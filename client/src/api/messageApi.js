import { useContext } from "react"
import { myContext } from "../Context"
import AxiosJWT from "../AxiosJWT"

const {REACT_APP_MESSAGE_SERVICE} = process.env

export function MessageJwtApi() {
  const {userObj} = useContext(myContext)
  const axiosJwt = AxiosJWT()

  //query contain userId
  const getMessagesApi = (query) => {
    return new Promise((resolve, reject) => {
      axiosJwt.get(REACT_APP_MESSAGE_SERVICE + '/message/get_messages'+query, 
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

  const createMessageApi = (message) => {
    return new Promise((resolve, reject) => {

      axiosJwt.post(REACT_APP_MESSAGE_SERVICE + '/message/create_message', 
        {message: message},
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
    getMessagesApi: getMessagesApi,
    createMessageApi: createMessageApi,
  }
}
