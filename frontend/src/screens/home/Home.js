import React, { useContext, useEffect } from 'react'
import ActiveChatSection from '../../components/dashboard/active-chat-section/ActiveChatSection';
import ActiveUsersSection from '../../components/dashboard/active-users-section/ActiveUsersSection';
import ChatGroupsSection from '../../components/dashboard/chat-groups-section/ChatGroupsSection';
import VideoSection from '../../components/dashboard/video-section/VideoSection';
import { SocketContext } from '../../contexts/SocketContext';
import { WebRTCContext } from '../../contexts/WebRTCContext';
import './Home.scss'

const Home = () => {
  const { username, setupSocketConnection } = useContext(SocketContext);
  const { getLocalStream } = useContext(WebRTCContext);
  useEffect(() => {
    // setupSocketConnection();
    // getLocalStream();
  }, [])

  return (
    <div className='container'>
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