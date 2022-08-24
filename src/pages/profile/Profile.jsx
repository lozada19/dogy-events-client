import React from 'react'
import MydDog from '../../components/MydDog'
import MyEvent from '../../components/MyEvent'

function Profile() {
  return (
    <div className='perfil'>
      <div>
        <MydDog/>
      </div>
      <div>
      <MyEvent/> 
      </div>
    </div>
  )
}

export default Profile