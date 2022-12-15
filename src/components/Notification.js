import React, { } from 'react'
import "../css/Notification.css"

const Notification = ({text, isShown}) => {
  return (
    isShown && <div class="Notification">{text}</div>
  )
}

export default Notification;