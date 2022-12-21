import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useNavigation } from 'react-router-dom';
import ActiveChatSection from '../../components/dashboard/active-chat-section/ActiveChatSection';
import ActiveUsersSection from '../../components/dashboard/active-users-section/ActiveUsersSection';
import ChatGroupsSection from '../../components/dashboard/chat-groups-section/ChatGroupsSection';
import VideoSection from '../../components/dashboard/video-section/VideoSection';
import { connectWithWebSocket, disconnectUser } from '../../utils/SocketUtil';
import { getLocalStream } from '../../utils/WebRCTUtil';
import './Home.scss'

const Home = () => {
  const { userInfo: { username } } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (!username || username === "") {
      navigate('/')
    }

    connectWithWebSocket();
    getLocalStream();

    /*
    //Call alertUser function as follows if you want to get confirmation before leaving page
    window.addEventListener('beforeunload', alertUser)
    return () => {
      window.removeEventListener('beforeunload', alertUser)
    }

    const alertUser = e => {
      e.preventDefault()
      e.returnValue = ''
    }
  
    //Call any function as follows if you want to call a function before leaving the page
    return () => {
      window.addEventListener('beforeunload', disconnectUser());
    }
    */
    return () => {
      window.addEventListener('beforeunload', disconnectUser());
    }
  }, [])



  return (
    <div className='homeContainer'>
      <div className='videoChatGroupsWrapper'>
        <div className='videoContainer'>
          <VideoSection />
        </div>
        <div className='chatGroupsContainer'>
          <ChatGroupsSection />
        </div>
      </div>
      <div className='activeUsersActiveChatWrapper'>
        <div className='activeUsersContainer'>
          <ActiveUsersSection />
        </div>
        <div className='activeChatContainer'>
          <ActiveChatSection />
        </div>
      </div>
    </div>
  )
}

export default Home