import React from 'react'
import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom'
import { CallStates } from '../../enums';
import DashboardInfo from './child-components/dashboard-info/DashboardInfo';
import IncomingCallDialog from './child-components/incoming-call-dialog/IncomingCallDialog';
import LocalVideoView from './child-components/local-video-view/LocalVideoView';
import './VideoSection.scss'
import RemoteVideoView from './child-components/remote-video-view/RemoteVideoView';
import OutgoingCallDialog from './child-components/outgoing-call-dialog/OutgoingCallDialog';


const VideoSection = () => {
  const {
    localStream,
    remoteStream,
    callState,
    callerUsername,
    calleeUsername,
    callingDialogVisible,
    callRejected
  } = useSelector((state) => state.call);

  return (
    <div className='videoSectionContainer'>
      <LocalVideoView localStream={localStream} />
      {remoteStream && callState === CallStates.CALL_IN_PROGRESS ?
        <RemoteVideoView remoteStream={remoteStream} />
        :
        <>
          <DashboardInfo />
        </>
      }
      {callState === CallStates.CALL_REQUESTED && <IncomingCallDialog callerUsername={callerUsername} />}
      {(callingDialogVisible || callRejected.rejected) && <OutgoingCallDialog calleeUsername={calleeUsername} callRejected={callRejected} />}
    </div>
  )
}

export default VideoSection