
import {useState} from 'react'
import {sendMessage, isTyping} from 'react-chat-engine'
import {SendOutlined, PictureOutlined} from '@ant-design/icons'

const MessageForm = (props) =>{

    //initial value of msg is nothing set accordingly
    const [value, setValue] = useState('')
    const { chatId, creds } = props;

    const handleSubmit = (event) => {
        //Make sure page does not refresh when msg submitted
        event.preventDefault();
        const text = value.trim();

        if(text.length > 0) sendMessage(creds, chatId, {text});
        //To clear the mesg field set back to empty string after a message is sent
        setValue('');
    }

    const handleChange = (event) => {
        setValue(event.target.value);
        isTyping(props, chatId);

    }

    const handleUpload = (event) => {
        //No text in img set value to empty string
        sendMessage(creds,chatId, {files: event.target.files, text: ''})
    }

    return(
        <form className = 'message-form' onSubmit = {handleSubmit}>
            <input 
                className = "message-input"
                placeholder = "Please enter a message..."
                value = {value}
                onChange = {handleChange}
                onSubmit = {handleSubmit}
            />
            {/* Use imported '@ant-design/icons' to get symbols */}
            <label htmlFor = "upload-button">
                <span className = "image-button">
                    <PictureOutlined  className = "picture-icon" />
                </span>
            </label>
            <input 
             type = "file"
             multiple = {false}
             id = "upload-button"
             style = {{display : 'none'}}
             onChange = {handleUpload}
            />
            <button type = "submit" className = 'send-button'>
                <SendOutlined className = "send-icon" />
            </button>
        </form>
    );
}

export default MessageForm;