import React, { useContext, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import UseDebounce from '../utils/UseDebounce';
import { UserJwtApi } from '../../api/userApi';
import { queryUrlServer } from '../utils/manipulateString';
import GroupSearchedUsersItem from './GroupSearchedUsersItem';
import { CircularProgress } from '@material-ui/core';
import { ChatJwtApi } from '../../api/chatApi';
import { myContext } from '../../Context';


// const [groupChat, setGroupChat] = useState({
  //   name: '',
  //   users: [],
  //   isGroup: true,
  //   groupAdminApi:
  // })


function CreateGroupChatModal({getChats, open, handleClose}) {
  const debounce = UseDebounce()
  const {searchUsersApi} = UserJwtApi()
  const {createChatApi} = ChatJwtApi()
  const context = useContext(myContext)

  const [loading, setLoading] = useState(false)
  const [groupName, setGroupName] = useState('')
  const [searchUserName, setSearchUserName] = useState('')
  const [searchedUsers, setSearchedUsers] = useState([])
  const [joinedUsers, setJoinedUsers] = useState([])
  

  const searchUsers = () => {
    setLoading(true)
    searchUsersApi(queryUrlServer({name: searchUserName}))
    .then(data => {
      setSearchedUsers(data.users); 
      setLoading(false)
    })
    .catch(e => alert(e.message))
  }

  useEffect(() => {
    
    debounce(searchUsers, 1000)
  }, [searchUserName])

  const handleDeleteUsers = (userId) => {
    const filterUsers = joinedUsers.filter(e => e.id != userId)
    setJoinedUsers(filterUsers)
  }

  console.log(loading);

  const handleCreateGroupChat = () => {
    if (!groupName)  {
      alert('Group chat must have a name')
      return
    }
    if (joinedUsers.length < 2) {
      alert('Group chat must have at least 3 members')
    }
    const joinedUsersId = []
    joinedUsers.map(user => joinedUsersId.push(user.id))

    const chat = {
      name: groupName,
      users: [...joinedUsersId, context.userObj?.id],
      groupAdminId: context.userObj?.id,
      isGroup: true
    }
    createChatApi(chat).then(async (data) => {
      context.setSelectedChat(data.chat)
      await getChats()
    }).catch(e => alert(e.message))
    clickClose()
  }

  const clickClose = () => {
    // const [groupName, setGroupName] = useState('')
    // const [searchUserName, setSearchUserName] = useState('')
    // const [searchedUsers, setSearchedUsers] = useState([])
    // const [joinedUsers, setJoinedUsers] = useState([])
    setGroupName('')
    setSearchUserName('')
    setSearchedUsers([])
    setJoinedUsers([])
    handleClose()
  }
  

  return (
    <div>
      <Dialog open={open} onClose={clickClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create group chat</DialogTitle>



        <DialogContent>
          <div id='groupchat_container'>
            <input type="text" onChange={(e) => setGroupName(e.target.value)} placeholder='Group name' />
            <input type="text" style={{marginTop: '10px'}} onChange={(e) => setSearchUserName(e.target.value)} placeholder='User name' />
            {loading && <CircularProgress style={{marginTop: '20px', color: 'black'}} />}
            
            <div id='showJoined_users'>
              {joinedUsers?.map(user => {
                return <div className='users_chip'>
                  {user.name} <span onClick={()=>{handleDeleteUsers(user.id)}} style={{color:'red', cursor:'pointer'}} >x</span>
                </div>
              })}
            </div>
            
            <div id='groupSearchedUser_list'>
              {searchedUsers.map(user => {
                return <GroupSearchedUsersItem key={user.id} user={user} joinedUsers={joinedUsers} setJoinedUsers={setJoinedUsers} />
              })}
            </div>
          </div>
        </DialogContent>



        <DialogActions>
          <Button onClick={clickClose} color="tertiary">
            Cancel
          </Button>
          <Button onClick={handleCreateGroupChat} color="tertiary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CreateGroupChatModal