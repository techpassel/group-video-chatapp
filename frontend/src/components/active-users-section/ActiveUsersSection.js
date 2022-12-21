import React from 'react'
import { IoPersonCircle } from "react-icons/io5";
import { FaCheck, FaVideo } from "react-icons/fa"
import './ActiveUsersSection.scss';
import { useSelector } from 'react-redux';
import { CallStates } from '../../enums';
import { callToOtherUser } from '../../utils/WebRCTUtil';

const users = ['Aman', 'Mohan', 'Pawan', 'Payal', 'Priyanka', 'Shweta', 'Priyanshi', 'Sameer'];
const active = true;

const ActiveUsersSection = () => {
    const { activeUsers } = useSelector((state) => state.user)
    const { callState } = useSelector((state) => state.call)

    const handleListItemPressed = (activeUser) => {
        if (callState === CallStates.CALL_AVAILABLE) {
            callToOtherUser(activeUser);
        }
    };

    return (
        <div className='ausContainer'>
            {activeUsers.length == 0 ? (
                <div className='noActiveUsers'>
                    <span className='noActiveUSerText'>No active users now.</span>
                </div>
            ) : (<>
                {
                    activeUsers.map((user, index) => (
                        <div className='userAtiveWrapper' key={index}>
                            <div className='userWrapper'>
                                <IoPersonCircle className='avatar' />
                                <span>{user.username}</span>
                            </div>
                            <FaVideo className='callAvailableIcon' onClick={() => handleListItemPressed(user)} />
                            {/* {active && (
                                <FaCheck className='activeUserCheck' />
                            )} */}
                        </div>
                    ))
                }
            </>)}
        </div>
    )
}

export default ActiveUsersSection