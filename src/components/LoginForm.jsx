import {useState} from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [username, setUsername] = useState ('');
    const [password, setPassword] = useState ('');
    const [error, setError] = useState ('');

    const handleSubmit = async (e) => {
        //Prevent the browser from refreshing
        e.preventDefault();
        
        const authObject = {'Project-ID': "afc6166d-36d3-48d0-8c2c-a5e6380e80e4", 'User-Name': username, 'User-Secret':password}
        try{
             //If succeeded means logged in 
            await axios.get('https://api.chatengine.io/chats', {headers: authObject});
            localStorage.setItem('username', username)
            localStorage.setItem('password', password)

            //Reload since it needs to be saved into local storage
            window.location.reload();
        } catch (error){
             //If errors try new username
             setError('Incorrect Credentials. Please try again.')

        }
    }

    return (
        <div className = "wrapper">
            <div className = "form">
                <h1 className = "title">Enter credentials to chat!</h1>
                <form onSubmit = {handleSubmit}>
                    {/* Stores the value of username */}
                    {/* need to fill in this field */}
                    <input type = "text" value = {username} onChange = {(e) => setUsername(e.target.value)} className = "input" placeholder = "Username" required/>
                    <input type = "password" value = {password} onChange = {(e) => setPassword(e.target.value)} className = "input" placeholder = "Password" required/>
                    <div align = "center">
                        <button type = "submit" className = "button">
                            <span>Start Chatting</span>
                        </button>
                    </div>
                    {/* render out the error */}
                    <div style = {{height: '25px'} }/>
                    <h2 className = "error" style={{color: 'white', fontSize: '21px'}}>{error}</h2>
                </form>
            </div>   
        </div>
    )
}

export default LoginForm