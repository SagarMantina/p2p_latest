import React from 'react'
import UserProfile from './UserProfile'
import UserGames from './UserGames'
import UserTransactions from './UserTransactions'

const UserDashboard = (props) => {
  return (
    <div className='userdashboard'>
        <h1 style={{position:'relative', left:'25%', color:'white'}}>User DashBoard</h1>
        {
          props.usernav === "AccountDetails" ? <UserProfile /> : null
        }
        {
          props.usernav === "MyGames" ? <UserGames /> : null
        }
        {
            props.usernav === "Transactions" ? <UserTransactions/> : null
        }
    </div>
  )
}

export default UserDashboard