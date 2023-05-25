import React, { useState } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import '../../style/searchUser.css'
import { UserJwtApi } from '../../api/userApi';
import { queryUrlServer } from '../utils/manipulateString';
import { CircularProgress } from '@material-ui/core';
import UserListItem from './UserListItem';

function UserSearch({open, handleClose}) {
  const {searchUsersApi} = UserJwtApi()
  const [findUserObj, setFindUserObj] = useState({
    name: ''
  })
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  //console.log(users);

  const searchUser = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const usersRes = await searchUsersApi(queryUrlServer(findUserObj))
      setUsers(usersRes.users)
      setLoading(false)
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogContent>
        <div id="searchUser_container">
          <form id='form_search' onSubmit={searchUser}>
            <input type="text" placeholder='Username' onChange={(e)=>setFindUserObj({name:e.target.value})} />
            <button type='submit'>GO</button>
          </form>
          {loading && <CircularProgress style={{marginTop: '20px', color:'black'}} />}
          {users.length == 0 && <div style={{marginTop:'20px'}}>Empty</div>}
          <div id='user_list'>
            {users.map(user => {
              return <UserListItem user={user} handleClose={handleClose} />
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UserSearch