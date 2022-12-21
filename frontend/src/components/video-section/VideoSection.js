import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { CallStates } from '../../enums';
import DashboardInfo from './child-components/dashboard-info/DashboardInfo';
import IncomingCallDialog from './child-components/incoming-call-dialog/IncomingCallDialog';
import LocalVideoView from './child-components/local-video-view/LocalVideoView';
import './VideoSection.scss'


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
    <div className='videoSectionContainer'>
      <LocalVideoView />
      {callState !== CallStates.CALL_IN_PROGRESS && <DashboardInfo />}
      {callState === CallStates.CALL_REQUESTED && <IncomingCallDialog callerUsername={callerUsername} />}
    </div>
  )
}

export default VideoSection