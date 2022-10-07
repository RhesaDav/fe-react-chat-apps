import React from 'react'
import {RiLogoutCircleRLine} from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import '../styles/ChatContainer.scss'

export default function Logout() {
    const navigate = useNavigate()

    const handleLogout = async () => {
        localStorage.clear()
        navigate('/login')
    }

  return (
    <div className='container-logout' onClick={handleLogout}>
        <RiLogoutCircleRLine />
    </div>
  )
}
