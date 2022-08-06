import React from 'react';

import MessageForm from './MessageForm'
import MyMessage from './MyMessage'
import TheirMessage from './TheirMessage'

const ChatFeed = (props) => {
    const {chats, activeChat, userName, messages} = props;

    const chat = chats && chats[activeChat];


    const renderReadRecipts = (message, isMyMessage) => {
        //Render only if the person has read the msg
        return chat.people.map((person,index) => person.last_read === message.id && (
            <div 
                //Render
                key = {`read_${index}`}
                className = "read-receipt"
                style = {{
                    float: isMyMessage ? 'right' : 'left',
                    backgroundImage: `url(${person.person.avatar})`
                }}
            />
        ))
       

    }

    const renderMessages = () =>{
        //Retrieve Keys from messages
        const keys = Object.keys(messages);
        return keys.map((key,index) =>{
            const message = messages[key];
            const lastMessageKey = index === 0 ? null : keys[index - 1];
            const isMyMessage = userName === message.sender.username;
            return(
                
               
                <div key={`msg_${index}`} style={{ width: '100%' }}>
                    <div className = "message-block">
                        {
                            isMyMessage
                            ? <MyMessage message = {message} />
                            : <TheirMessage message = {message} lastMessage = {messages[lastMessageKey]} />
                        }
                    </div>
                    {/* Determine if it is my message or not and render them */}
                    <div className = "read-recipts" style = {{marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px'}}>
                        {renderReadRecipts(message, isMyMessage)}
                    </div>
                </div>
            );
        })
    }

    if(!chat) return 'Loading...';

    return(
        <div className = 'chat-feed'>
            <div className = 'chat-title-container'>
                {/* Make sure that chat is available before we try and access title */}
                <div className = 'chat-title'>{chat?.title} </div>
                <div className = 'chat-subtitle'>
                    {/* subtitle of the chat */}
                    {chat.people.map((person) => ` ${person.person.username}`)}
                </div>
            </div>
            {renderMessages()}
            <div style = {{height: '100px'} }/>
            <div className = 'message-form-container'>
                <MessageForm { ... props} chatId = {activeChat} />
            </div>
        </div>
    );
}

export default ChatFeed;