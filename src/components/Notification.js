import React, { useEffect } from 'react'
import "../css/Notification.css"

export const showNotif = (text, setState) => {
  setState({
    text:text,
    timestamp:Date.now()
  });
}

const Notification = (props) => {

  const notifRef = React.createRef();
  useEffect(() => {
    const element = notifRef.current;
    if (element) {
      setTimeout(() => {
        element.className = "Notification transitioning";
      }, 250)
      element.className = "Notification";
    }
  }, [props.input, notifRef])

  return (
    props.input.text && 
    <div class="Notification" ref={notifRef}>{props.input.text}</div>
  )
}

Notification.defaultProps = {
  input: {
    text: "",
    timestamp: 0
  }
}

export default Notification;