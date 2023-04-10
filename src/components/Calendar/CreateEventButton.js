import React, { useContext } from 'react'
import GlobalContext from '../../context/GlobalContext'

export default function CreateEventButton() {
    const {setShowEventModal} = useContext(GlobalContext)
  
    return (
    <button onClick={() => setShowEventModal(true)}>CreateEventButton</button>
  )
}
