import React, {useContext} from 'react'
import axios from "axios";
import { myContext } from './Context';
import jwt_decode from 'jwt-decode' 


const {REACT_APP_USER_SERVICE} = process.env

function AxiosJWT() {
  const context = useContext(myContext)
  const axiosJWT = axios.create()

  //const {accsessToken} = context.userObj

  // TODO: when client request to server, axiosJWT will check if token expires then request a new one
  axiosJWT.interceptors.request.use(async (config) => {
    const date = new Date()
    const decodedToken = jwt_decode(context.userObj.accessToken)
    //if token is expired
    if (decodedToken.exp < date.getTime()/1000) {
      try {
        const refreshTokenRequest = await axios.post(REACT_APP_USER_SERVICE + '/user/auth/refresh_token', {
          userId: context?.userObj.id
        })
        const access_token = refreshTokenRequest.data.access_token
        context.setUserObj({...context?.userObj, accessToken: access_token})
        config.headers["Authorization"] = access_token
      } catch (e) {
        return e
      }
    }
    return config
  }, err => {
    return Promise.reject(err)
  })

  return axiosJWT
}

export default AxiosJWT