import {ChatEngine} from 'react-chat-engine';
import ChatFeed from './components/ChatFeed';
import LoginForm from './components/LoginForm';
import './App.css';

const App = () => {
    //If there is no username we want to be directed to the login form 
    if(!localStorage.getItem('username')) return <LoginForm />


    return(
        <ChatEngine 
            height = "100vh"
            projectID = "afc6166d-36d3-48d0-8c2c-a5e6380e80e4"
            userName = {localStorage.getItem('username')}
            userSecret = {localStorage.getItem('password')}
            renderChatFeed = {(chatAppProps) => <ChatFeed {... chatAppProps}/>} 
        />
    );
}

export default App;