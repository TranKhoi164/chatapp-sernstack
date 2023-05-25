import React, { useContext } from 'react'
import '../../style/messages.css'
import { Avatar } from '@material-ui/core'
import { myContext } from '../../Context'

function GroupSearchedUsersItem({user, joinedUsers, setJoinedUsers}) {
  const {userObj} = useContext(myContext)
  const handleClick = () => {
    let check = true
    joinedUsers.forEach(e => {
      // console.log(e.id);
      if (user.id == e.id) {
        check = false
        return 
      }
    })
    console.log('c: ', check);
    if (check) setJoinedUsers([...joinedUsers, user])
  }

  return (
    <div className='searchedUser_item' onClick={handleClick} style={userObj?.id==user?.id?{display:'none'}:{}}>
      <Avatar alt={user?.name} style={{margin: '0 10px 0 10px', width: '30px', height:'30px'}} src={user?.picture} />
      {user.name}
    </div>
  )
}

export default GroupSearchedUsersItem