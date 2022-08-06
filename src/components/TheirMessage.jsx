const TheirMessage = ({ lastMessage, message }) => {
    //Check if its the first message
    const isFirstMessageByUser = !lastMessage || lastMessage.sender.username !== message.sender.username;
  
    return (
      <div className="message-row">
        {isFirstMessageByUser && (
          <div
            className="message-avatar"
            style={{ backgroundImage: message.sender && `url(${message.sender.avatar})` }}
          />
        )}
        {/* //Check if its an image */}
        {message.attachments && message.attachments.length > 0
          ? (
            <img
              src={message.attachments[0].file}
              alt="message-attachment"
              className="message-image"
              style={{ marginLeft: isFirstMessageByUser ? '4px' : '48px' }}
            />
          )
          : (
              //Set the msg to left side of screen since it is not ours
            <div className="message" style={{ float: 'left', backgroundColor: '#CABCDC', marginLeft: isFirstMessageByUser ? '4px' : '48px' }}>
              {message.text}
            </div>
          )}
      </div>
    );
  };
  
  export default TheirMessage;