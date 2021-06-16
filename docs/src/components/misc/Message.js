import React from "react"

const Message = ({ sendMessage }) => {
    return <p className="message-box">{`Message: ${sendMessage}`}</p>
}

export default Message