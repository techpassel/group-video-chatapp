import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'



const VideoSection = () => {
  const {
    localStream,
    remoteStream,
    callState,
    callerUsername,
    callingDialogVisible,
    callRejected
  } = useSelector((state) => state.call);

  return (
    <div>
      <div>
        Video Player
      </div>
    </div>
  )
}

export default VideoSection