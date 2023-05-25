import {io} from 'socket.io-client'

const server1 = 'http://localhost:5001'

//service
export const socketUser = io(server1, {
  autoConnect: false
})
