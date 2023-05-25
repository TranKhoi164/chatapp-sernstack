import axios from "axios"
import { useContext } from "react"
import { myContext } from "../Context"
import AxiosJWT from "../AxiosJWT"

const {REACT_APP_USER_SERVICE} = process.env

export const registerApi = (userInfor) => {
  return new Promise((resolve, reject) => {
    axios.post(REACT_APP_USER_SERVICE + '/user/auth/register', {
      user: userInfor
    })
    .then(data => {
      resolve(data.data)
    }).catch(e => {
      if (!e.response.data.message) {
        reject(e)
      }
      reject(e.response.data)
    }) 
  })
}

//name, password
export const loginApi = (userInfor) => {
  return new Promise((resolve, reject) => {
    axios.post(REACT_APP_USER_SERVICE + '/user/auth/login', {
      user: userInfor
    })
    .then(data => {
      resolve(data.data)
    }).catch(e => {
      if (!e.response.data.message) {
        reject(e)
      }
      reject(e.response.data)
    }) 
  })
}

export function UserJwtApi() {
  const {userObj} = useContext(myContext)
  const axiosJwt = AxiosJWT()

  const getUserInforApi = () => {
    return new Promise((resolve, reject) => {
      axiosJwt.get(REACT_APP_USER_SERVICE + '/user/auth/get_user_infor', {
        headers: {Authorization: userObj?.accessToken}
      }).then(data => {
        console.log(data);
        resolve(data.data)
      }).catch(e => {
        if (!e.response.data.message) {
          reject(e)
        }
        reject(e.response.data)
      }) 
    })
  }

  const searchUsersApi = (query) => {
    return new Promise((resolve, reject) => {
      axios.get(REACT_APP_USER_SERVICE + '/user/search_users'+query)
      .then(data => {
        resolve(data.data)
      }).catch(e => {
        if (!e?.response?.data?.message) {
          reject(e)
        }
        reject(e.response.data)
      }) 
    })
  }

  const logoutApi = () => {
    return new Promise((resolve, reject) => {
      axiosJwt.get(REACT_APP_USER_SERVICE + '/user/auth/logout', {
        headers: {Authorization: userObj?.accessToken}
      }).then(data => {
        resolve(data.data)
      }).catch(e => {
        if (!e?.response?.data?.message) {
          reject(e)
        }
        reject(e.response.data)
      }) 
    })
  }
  
  return {
    getUserInforApi: getUserInforApi,
    logoutApi: logoutApi,
    searchUsersApi: searchUsersApi
  }
}
