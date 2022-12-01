import React, { useContext, useEffect } from 'react'
import { SocketContext } from '../../contexts/SocketContext';
import { WebRTCContext } from '../../contexts/WebRTCContext';

const Home = () => {
  const { username, setupSocketConnection } = useContext(SocketContext);
  const { getLocalStream } = useContext(WebRTCContext);
  useEffect(() => {
    setupSocketConnection();
    getLocalStream();
  }, [])

  return (
    <div>Home {username}</div>
  )
}

export default Home